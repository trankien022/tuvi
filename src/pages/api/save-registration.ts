import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'fullName',
      'phone',
      'email',
      'birthDay',
      'birthMonth',
      'birthYear',
      'birthHour',
      'gender',
      'packageName',
      'price',
      'orderCode',
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `Missing required field: ${field}`,
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
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

    console.log('Sending data to Google Sheets:', {
      ...body,
      // Don't log sensitive info in production
      email: '***',
      phone: '***',
    });

    // Forward the request to Google Sheets
    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      redirect: 'follow',
    });

    // Google Apps Script returns text/html, not application/json
    const textResponse = await response.text();
    
    console.log('Google Sheets raw response:', textResponse);

    // Try to parse as JSON
    let result;
    try {
      result = JSON.parse(textResponse);
    } catch (e) {
      // If it's not JSON, check if response was successful
      if (response.ok) {
        result = { success: true, message: 'Data saved successfully' };
      } else {
        throw new Error('Failed to parse Google Sheets response');
      }
    }

    if (!result.success) {
      throw new Error(result.message || 'Failed to save data to Google Sheets');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: result.message || 'Data saved successfully',
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
    console.error('Google Sheets API Error:', error);

    let errorMessage = 'Failed to save registration data';
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

