import 'dotenv/config';
import { PayOS } from '@payos/node';

async function testPayOS() {
  try {
    console.log('=== Testing PayOS API ===\n');

    const clientId = process.env.PAYOS_CLIENT_ID;
    const apiKey = process.env.PAYOS_API_KEY;
    const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

    console.log('1. Checking credentials:');
    console.log('   CLIENT_ID:', clientId ? `${clientId.substring(0, 8)}...` : 'MISSING');
    console.log('   API_KEY:', apiKey ? `${apiKey.substring(0, 8)}...` : 'MISSING');
    console.log('   CHECKSUM_KEY:', checksumKey ? `${checksumKey.substring(0, 16)}...` : 'MISSING');
    console.log('');

    if (!clientId || !apiKey || !checksumKey) {
      throw new Error('Missing PayOS credentials in .env file');
    }

    console.log('2. Creating PayOS instance...');
    const payOS = new PayOS(clientId, apiKey, checksumKey);
    console.log('   ✓ PayOS instance created successfully\n');

    console.log('3. Inspecting PayOS instance...');
    console.log('   Instance keys:', Object.keys(payOS));
    console.log('   paymentRequests:', payOS.paymentRequests);
    console.log('   paymentRequests methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(payOS.paymentRequests)));
    console.log('');

    console.log('4. Creating test payment link...');
    const orderCode = Number(String(Date.now()).slice(-6));
    const paymentData = {
      orderCode: orderCode,
      amount: 10000,
      description: 'Test payment',
      returnUrl: 'https://trucnghi.vercel.app/payment-success',
      cancelUrl: 'https://trucnghi.vercel.app/payment-cancel',
      items: [
        {
          name: 'Test Item',
          quantity: 1,
          price: 10000,
        },
      ],
    };

    console.log('   Payment data:', JSON.stringify(paymentData, null, 2));
    console.log('');

    const response = await payOS.paymentRequests.create(paymentData);
    
    console.log('4. ✅ SUCCESS! Payment link created:');
    console.log('   Order Code:', response.orderCode);
    console.log('   Checkout URL:', response.checkoutUrl);
    console.log('   Payment Link ID:', response.paymentLinkId);
    console.log('');
    console.log('Full response:', JSON.stringify(response, null, 2));
    
  } catch (error) {
    console.error('\n❌ ERROR:');
    console.error('Message:', error.message);
    console.error('Type:', error.constructor.name);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    
    console.error('\nFull error object:', JSON.stringify(error, null, 2));
  }
}

testPayOS();

