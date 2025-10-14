import type { APIRoute } from 'astro';
import { withSecurity } from '~/lib/security/middleware';

function isProduction(): boolean {
  const mode = (import.meta as any).env?.MODE || process.env.NODE_ENV;
  return mode === 'production';
}

export const POST: APIRoute = withSecurity(async ({ request }) => {
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
    const payOS: any = new (PayOS as any)(clientId, apiKey, checksumKey);

    if (!isProduction()) {
      console.log('Checking payment status for orderCode:', orderCode);
    }

    // Try multiple SDK methods defensively since types may vary by SDK versions
    const candidates: Array<(code: number | string) => Promise<any>> = [];
    const requests = payOS?.paymentRequests || payOS?.paymentlinks || payOS?.paymentLinks;

    if (requests) {
      const methodNames = [
        'getPaymentRequest',
        'getPaymentLinkInformation',
        'getByOrderCode',
        'get',
        'retrieve',
        'find',
        'status',
        'getStatus',
      ];

      for (const name of methodNames) {
        if (typeof requests[name] === 'function') {
          candidates.push((code) => requests[name](code));
          candidates.push((code) => requests[name]({ orderCode: Number(code) }));
        }
      }
    }

    let remote: any | null = null;
    let lastError: unknown = null;
    for (const attempt of candidates) {
      try {
        remote = await attempt(Number(orderCode));
        if (remote) break;
      } catch (err) {
        lastError = err;
      }
    }

    // Fallback: if SDK lookup failed, return a graceful error
    if (!remote) {
      throw new Error(
        'Unable to retrieve payment status from PayOS using available SDK methods'
      );
    }

    // Normalize data structure
    const remoteStatus: string =
      remote?.status || remote?.data?.status || remote?.paymentStatus || 'PENDING';
    const amount: number = Number(
      remote?.amount || remote?.data?.amount || remote?.totalAmount || 0
    );
    const description: string =
      remote?.description || remote?.data?.description || remote?.orderDescription || '';
    const createdAt: string =
      remote?.createdAt || remote?.data?.createdAt || remote?.time || new Date().toISOString();
    const updatedAt: string =
      remote?.updatedAt || remote?.data?.updatedAt || new Date().toISOString();

    const paymentInfo = {
      status: String(remoteStatus).toUpperCase(),
      amount,
      description,
      createdAt,
      updatedAt,
    };

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
          amount: paymentInfo.amount,
          description: paymentInfo.description,
          createdAt: paymentInfo.createdAt,
          updatedAt: paymentInfo.updatedAt,
        },
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
      console.error('Payment status check error:', error);
    }

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
});
