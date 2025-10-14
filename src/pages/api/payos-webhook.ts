import type { APIRoute } from 'astro';
import crypto from 'crypto';
import { withSecurity } from '~/lib/security/middleware';

function constantTimeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function isProduction(): boolean {
  // Astro uses import.meta.env.MODE
  const mode = (import.meta as any).env?.MODE || process.env.NODE_ENV;
  return mode === 'production';
}

export const POST: APIRoute = withSecurity(async ({ request }) => {
  try {
    // Read raw body for signature verification
    const rawBody = await request.text();

    // Verify webhook signature using HMAC SHA-256 with PAYOS_CHECKSUM_KEY
    const checksumKey = import.meta.env.PAYOS_CHECKSUM_KEY;
    const signatureHeaderCandidates = [
      'x-payos-signature',
      'x-signature',
      'payos-signature',
    ];
    const incomingSignature = signatureHeaderCandidates
      .map((h) => request.headers.get(h) || '')
      .find((val) => Boolean(val));

    if (checksumKey) {
      if (!incomingSignature) {
        if (isProduction()) {
          return new Response(
            JSON.stringify({ success: false, message: 'Missing webhook signature' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
          );
        }
        console.warn('Webhook signature header missing - allowed in non-production');
      } else {
        const computed = crypto
          .createHmac('sha256', checksumKey)
          .update(rawBody)
          .digest('hex');

        const computedAlt = Buffer.from(
          crypto.createHmac('sha256', checksumKey).update(rawBody).digest()
        ).toString('base64');

        const isValid =
          constantTimeEqual(incomingSignature, computed) ||
          constantTimeEqual(incomingSignature, computed.toLowerCase()) ||
          constantTimeEqual(incomingSignature, computed.toUpperCase()) ||
          constantTimeEqual(incomingSignature, computedAlt);

        if (!isValid) {
          if (isProduction()) {
            return new Response(
              JSON.stringify({ success: false, message: 'Invalid webhook signature' }),
              { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
          }
          console.warn('Invalid webhook signature - allowed in non-production');
        }
      }
    }

    // Parse body after signature verification
    const body = JSON.parse(rawBody);
    const { data, type } = body;

    console.log('PayOS webhook received:', { type, data });

    // Validate webhook data
    if (!data || !data.orderCode) {
      console.error('Invalid webhook data: missing orderCode');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid webhook data',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const { orderCode, status, amount, description } = data;

    // Determine payment status
    let paymentStatus = 'pending';
    let isPaid = false;

    if (status === 'PAID') {
      paymentStatus = 'paid';
      isPaid = true;
    } else if (status === 'CANCELLED') {
      paymentStatus = 'cancelled';
    } else if (status === 'EXPIRED') {
      paymentStatus = 'expired';
    } else {
      paymentStatus = 'pending';
    }

    console.log('Payment status determined:', {
      orderCode,
      status,
      paymentStatus,
      isPaid,
    });

    // Update payment status in Google Sheets
    const googleSheetsUrl = import.meta.env.PUBLIC_GOOGLE_SHEETS_SCRIPT_URL;
    
    if (googleSheetsUrl) {
      try {
        const updateData = {
          action: 'updatePaymentStatus',
          data: {
            orderCode: orderCode,
            paymentStatus: paymentStatus,
            paymentAmount: amount || 0,
            paymentDescription: description || '',
            paymentUpdatedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        };

        console.log('Updating payment status in Google Sheets:', updateData);

        const response = await fetch(googleSheetsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
          redirect: 'follow',
        });

        const textResponse = await response.text();
        console.log('Google Sheets update response:', textResponse);

        if (!response.ok) {
          console.error('Failed to update Google Sheets:', textResponse);
        }
      } catch (error) {
        console.error('Error updating Google Sheets:', error);
        // Don't fail the webhook if Google Sheets update fails
      }
    } else {
      console.warn('Google Sheets URL not configured, skipping update');
    }

    // Return success response to PayOS
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Webhook processed successfully',
        orderCode: orderCode,
        status: paymentStatus,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('PayOS webhook error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Webhook processing failed',
        error: error instanceof Error ? error.toString() : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
