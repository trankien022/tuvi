/**
 * Application Constants
 * Centralized configuration for the application
 */

// ===========================
// Application Info
// ===========================
export const APP_CONFIG = {
  name: 'Tử Vi Trúc Nghi',
  description: 'Luận giải Tử Vi chuyên nghiệp - Biết vận hạn, nắm cơ hội, tránh rủi ro',
  url: 'https://trucnghi.vercel.app',
  email: 'contact@trucnghi.vercel.app',
  phone: '+84-901-234-567',
} as const;

// ===========================
// Trust Badges
// ===========================
export const TRUST_BADGES = [
  {
    icon: 'shield-check',
    label: 'Bảo mật SSL',
    color: 'text-green-500',
  },
  {
    icon: 'phone',
    label: 'Hỗ trợ 24/7',
    color: 'text-blue-500',
  },
  {
    icon: 'check-circle',
    label: 'Hoàn tiền 100%',
    color: 'text-purple-500',
  },
] as const;

// ===========================
// SEO & Social Media
// ===========================
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/trucnghi',
  telegram: 'https://t.me/trucnghi',
} as const;

// ===========================
// Analytics Events
// ===========================
export const ANALYTICS_EVENTS = {
  ctaClick: 'cta_click',
  scrollDepth: 'scroll_depth',
  packageSelect: 'package_select',
} as const;
