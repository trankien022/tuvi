import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, site }) => {
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

    console.log('Received request body:', body);

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

    console.log('PayOS Credentials check:', {
      hasClientId: !!clientId,
      hasApiKey: !!apiKey,
      hasChecksumKey: !!checksumKey,
      clientIdLength: clientId?.length || 0,
      apiKeyLength: apiKey?.length || 0,
      checksumKeyLength: checksumKey?.length || 0,
    });

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
    console.log('Importing PayOS module...');
    const { PayOS } = await import('@payos/node');
    
    console.log('Creating PayOS instance...');
    const payOS = new PayOS(clientId, apiKey, checksumKey);
    console.log('PayOS instance created successfully');

    // Get base URL - try multiple sources
    const siteUrl = site?.toString()?.replace(/\/$/, '');
    const envUrl = import.meta.env.PUBLIC_SITE_URL;
    const baseUrl = siteUrl || envUrl || 'https://trucnghi.vercel.app';
    const returnUrl = `${baseUrl}/payment-success`;
    const cancelUrl = `${baseUrl}/payment-cancel`;

    console.log('URLs:', { 
      siteUrl,
      envUrl,
      baseUrl, 
      returnUrl, 
      cancelUrl,
      hasSite: !!site,
      hasEnvUrl: !!envUrl,
    });

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

    console.log('Creating PayOS payment link with data:', paymentData);

    // Call PayOS API to create payment link using v2 API
    const paymentLinkResponse = await payOS.paymentRequests.create(paymentData);

    console.log('PayOS response:', paymentLinkResponse);

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
    console.error('PayOS API Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      errorType: typeof error,
      errorConstructor: error?.constructor?.name,
      errorString: String(error),
    });

    // Try to extract more details from error
    if (error && typeof error === 'object') {
      console.error('Error object keys:', Object.keys(error));
      
      // Check for axios-style errors (PayOS SDK uses axios)
      const errorObj = error as any;
      if (errorObj.response) {
        console.error('HTTP Response Error:', {
          status: errorObj.response.status,
          statusText: errorObj.response.statusText,
          data: errorObj.response.data,
          headers: errorObj.response.headers,
        });
      }
      
      if (errorObj.request) {
        console.error('Request details:', {
          method: errorObj.request.method,
          url: errorObj.request.url,
          headers: errorObj.request.headers,
        });
      }
      
      console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
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
};

