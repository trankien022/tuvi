import type { APIRoute } from 'astro';
import crypto from 'crypto';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// CSRF token store (in production, use secure session storage)
const csrfTokenStore = new Map<string, { token: string; expires: number }>();

export interface SecurityConfig {
  rateLimit: {
    max: number;
    windowMs: number;
  };
  csrf: {
    secret: string;
    tokenExpiry: number;
  };
}

const defaultConfig: SecurityConfig = {
  rateLimit: {
    max: parseInt(import.meta.env.RATE_LIMIT_MAX || '100'),
    windowMs: parseInt(import.meta.env.RATE_LIMIT_WINDOW || '900000'), // 15 minutes
  },
  csrf: {
    secret: import.meta.env.CSRF_SECRET || 'default-secret-change-in-production',
    tokenExpiry: 3600000, // 1 hour
  },
};

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

export function checkRateLimit(clientIP: string, config = defaultConfig): boolean {
  const now = Date.now();
  const key = `rate_limit:${clientIP}`;
  const limit = rateLimitStore.get(key);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.rateLimit.windowMs,
    });
    return true;
  }

  if (limit.count >= config.rateLimit.max) {
    return false;
  }

  limit.count++;
  return true;
}

export function generateCSRFToken(sessionId: string, config = defaultConfig): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + config.csrf.tokenExpiry;

  csrfTokenStore.set(sessionId, { token, expires });
  return token;
}

export function validateCSRFToken(sessionId: string, token: string): boolean {
  const stored = csrfTokenStore.get(sessionId);

  if (!stored || Date.now() > stored.expires) {
    csrfTokenStore.delete(sessionId);
    return false;
  }

  return stored.token === token;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .trim()
    .substring(0, 1000); // Limit length
}

export function createSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
    ].join('; '),
  };
}

// Middleware wrapper for API routes
export function withSecurity(handler: APIRoute, config?: Partial<SecurityConfig>): APIRoute {
  const mergedConfig = { ...defaultConfig, ...config };

  return async (context) => {
    const { request } = context;
    const clientIP = getClientIP(request);

    // Rate limiting
    if (!checkRateLimit(clientIP, mergedConfig)) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil(mergedConfig.rateLimit.windowMs / 1000).toString(),
          ...createSecurityHeaders(),
        },
      });
    }

    // Add security headers to response
    const response = await handler(context);
    const securityHeaders = createSecurityHeaders();

    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  };
}
