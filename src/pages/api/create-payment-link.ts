import type { APIRoute } from 'astro';
import { withSecurity } from '~/lib/security/middleware';

function isProduction(): boolean {
  const mode = (import.meta as any).env?.MODE || process.env.NODE_ENV;
  return mode === 'production';
}

export const POST: APIRoute = withSecurity(async ({ request, site }) => {
  try {
    const body = await request.json();
    const {
      orderCode,
      amount,
      description,
      buyerName,
      buyerEmail,
      buyerPhone,
      packageName,
    } = body;

    if (!isProduction()) {
      console.log('Received request body (sanitized):', {
        orderCode,
        amount,
        description: description?.slice(0, 64),
        buyerName: buyerName?.slice(0, 32),
        buyerEmail: buyerEmail ? '***' : undefined,
        buyerPhone: buyerPhone ? '***' : undefined,
        packageName,
      });
    }

    // Validate required fields
    if (!orderCode || !amount || !description) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required fields: orderCode, amount, or description',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Validate PayOS credentials
    const clientId = import.meta.env.PAYOS_CLIENT_ID;
    const apiKey = import.meta.env.PAYOS_API_KEY;
    const checksumKey = import.meta.env.PAYOS_CHECKSUM_KEY;

    if (!isProduction()) {
      console.log('PayOS Credentials check:', {
        hasClientId: !!clientId,
        hasApiKey: !!apiKey,
        hasChecksumKey: !!checksumKey,
      });
    }

    if (!clientId || !apiKey || !checksumKey) {
      console.error('PayOS credentials are not configured');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Payment system is not configured properly. Please check PAYOS credentials in .env file.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Dynamic import PayOS to avoid SSR constructor issues
    if (!isProduction()) console.log('Importing PayOS module...');
    const { PayOS } = await import('@payos/node');
    
    if (!isProduction()) console.log('Creating PayOS instance...');
    const payOS = new PayOS(clientId, apiKey, checksumKey);
    if (!isProduction()) console.log('PayOS instance created successfully');

    // Get base URL - try multiple sources
    const siteUrl = site?.toString()?.replace(/\/$/, '');
    const envUrl = import.meta.env.PUBLIC_SITE_URL;
    const baseUrl = siteUrl || envUrl || 'https://trucnghi.vercel.app';
    const returnUrl = `${baseUrl}/payment-success`;
    const cancelUrl = `${baseUrl}/payment-cancel`;

    if (!isProduction()) {
      console.log('URLs:', { 
        baseUrl, 
        returnUrl, 
        cancelUrl,
      });
    }

    // Create payment link request
    const paymentData = {
      orderCode: Number(orderCode),
      amount: Number(amount),
      description: description,
      returnUrl: returnUrl,
      cancelUrl: cancelUrl,
      items: [
        {
          name: packageName || description,
          quantity: 1,
          price: Number(amount),
        },
      ],
    };

    // Add optional buyer info if provided
    if (buyerName) {
      paymentData.buyerName = buyerName;
    }
    if (buyerEmail) {
      paymentData.buyerEmail = buyerEmail;
    }
    if (buyerPhone) {
      paymentData.buyerPhone = buyerPhone;
    }

    if (!isProduction()) console.log('Creating PayOS payment link with data:', paymentData);

    // Call PayOS API to create payment link using v2 API
    const paymentLinkResponse = await payOS.paymentRequests.create(paymentData);

    if (!isProduction()) console.log('PayOS response:', paymentLinkResponse);

    // Return success response with checkout URL
    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: paymentLinkResponse.checkoutUrl,
        orderCode: orderCode,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (!isProduction()) {
      console.error('PayOS API Error:', error);
    }

    // Handle specific PayOS errors
    let errorMessage = 'Failed to create payment link';
    let errorDetails = '';
    let statusCode = 500;
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
      
      // Check for PayOS API specific errors
      const errorObj = error as any;
      if (errorObj.response?.data) {
        errorMessage = errorObj.response.data.message || errorObj.response.data.error || errorMessage;
        errorDetails = JSON.stringify(errorObj.response.data, null, 2);
        statusCode = errorObj.response.status || 500;
      }
    } else if (error && typeof error === 'object') {
      errorMessage = (error as any).message || String(error);
      errorDetails = JSON.stringify(error, null, 2);
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: errorMessage,
        error: error instanceof Error ? error.toString() : 'Unknown error',
        details: errorDetails,
      }),
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

