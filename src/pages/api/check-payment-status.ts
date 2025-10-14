import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { orderCode } = body;

    // Validate required fields
    if (!orderCode) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required field: orderCode',
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

    if (!clientId || !apiKey || !checksumKey) {
      console.error('PayOS credentials are not configured');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Payment system is not configured properly',
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
    const { PayOS } = await import('@payos/node');
    const payOS = new (PayOS as any)(clientId, apiKey, checksumKey);

    console.log('Checking payment status for orderCode:', orderCode);

    // Get payment information from PayOS
    try {
      const paymentInfo = await payOS.getPaymentLinkInformation(Number(orderCode));
      console.log('PayOS payment info:', paymentInfo);
      
      if (!paymentInfo) {
        throw new Error('Payment not found');
      }

      // Determine payment status
      let paymentStatus = 'pending';
      let isPaid = false;

      if (paymentInfo.status === 'PAID') {
        paymentStatus = 'paid';
        isPaid = true;
      } else if (paymentInfo.status === 'CANCELLED') {
        paymentStatus = 'cancelled';
      } else if (paymentInfo.status === 'EXPIRED') {
        paymentStatus = 'expired';
      } else {
        paymentStatus = 'pending';
      }

      // Return payment status
      return new Response(
        JSON.stringify({
          success: true,
          orderCode: orderCode,
          status: paymentStatus,
          isPaid: isPaid,
          paymentInfo: {
            status: paymentInfo.status,
            amount: paymentInfo.amount || 0,
            description: paymentInfo.description || '',
            createdAt: paymentInfo.createdAt || new Date().toISOString(),
            updatedAt: paymentInfo.updatedAt || new Date().toISOString(),
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (payOSError) {
      // If payment not found in PayOS, return not found status
      console.error('PayOS API error:', payOSError);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Payment information not found',
          orderCode: orderCode,
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Payment status check error:', error);

    let errorMessage = 'Failed to check payment status';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Handle specific PayOS errors
      const errorObj = error as any;
      if (errorObj.response?.data) {
        errorMessage = errorObj.response.data.message || errorObj.response.data.error || errorMessage;
        statusCode = errorObj.response.status || 500;
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: errorMessage,
        error: error instanceof Error ? error.toString() : 'Unknown error',
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
