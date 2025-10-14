import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      orderCode,
      paymentStatus,
      paymentInfo,
      registrationData,
    } = body;

    // Validate required fields
    if (!orderCode || !paymentStatus) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required fields: orderCode, paymentStatus',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Get Google Sheets Script URL from environment
    const googleSheetsUrl = import.meta.env.PUBLIC_GOOGLE_SHEETS_SCRIPT_URL;

    if (!googleSheetsUrl) {
      console.error('Google Sheets Script URL is not configured');
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Google Sheets integration is not configured',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Prepare data for Google Sheets
    const updateData = {
      orderCode: orderCode,
      paymentStatus: paymentStatus,
      paymentAmount: paymentInfo?.amount || 0,
      paymentDescription: paymentInfo?.description || '',
      paymentCreatedAt: paymentInfo?.createdAt || '',
      paymentUpdatedAt: paymentInfo?.updatedAt || '',
      updatedAt: new Date().toISOString(),
      // Include registration data if available
      ...(registrationData && {
        fullName: registrationData.fullName,
        phone: registrationData.phone,
        email: registrationData.email,
        packageName: registrationData.packageName,
        price: registrationData.price,
      }),
    };

    console.log('Updating payment status in Google Sheets:', {
      orderCode,
      paymentStatus,
      // Don't log sensitive info in production
      ...(registrationData && {
        email: '***',
        phone: '***',
      }),
    });

    // Send update request to Google Sheets
    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updatePaymentStatus',
        data: updateData,
      }),
      redirect: 'follow',
    });

    // Google Apps Script returns text/html, not application/json
    const textResponse = await response.text();
    
    console.log('Google Sheets update response:', textResponse);

    // Try to parse as JSON
    let result;
    try {
      result = JSON.parse(textResponse);
    } catch (e) {
      // If it's not JSON, check if response was successful
      if (response.ok) {
        result = { success: true, message: 'Payment status updated successfully' };
      } else {
        throw new Error('Failed to parse Google Sheets response');
      }
    }

    if (!result.success) {
      throw new Error(result.message || 'Failed to update payment status in Google Sheets');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: result.message || 'Payment status updated successfully',
        data: result.data,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Payment status update error:', error);

    let errorMessage = 'Failed to update payment status';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: errorMessage,
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
