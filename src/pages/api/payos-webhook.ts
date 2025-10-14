import type { APIRoute } from 'astro';
import crypto from 'crypto';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { data, type, signature } = body;

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

    // Verify webhook signature (CRITICAL for security)
    const checksumKey = import.meta.env.PAYOS_CHECKSUM_KEY;
    if (checksumKey && signature) {
      try {
        // Create HMAC hash of the data using checksum key
        const dataString = JSON.stringify(data);
        const expectedSignature = crypto
          .createHmac('sha256', checksumKey)
          .update(dataString)
          .digest('hex');

        // Compare signatures
        if (signature !== expectedSignature) {
          console.error('Invalid webhook signature');
          return new Response(
            JSON.stringify({
              success: false,
              message: 'Invalid signature',
            }),
            {
              status: 401,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }
        console.log('Webhook signature verified successfully');
      } catch (signatureError) {
        console.error('Error verifying signature:', signatureError);
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Signature verification failed',
          }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    } else if (!signature) {
      console.warn('No signature provided in webhook request - rejecting for security');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing signature',
        }),
        {
          status: 401,
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
};
