/**
 * Test script for Payment Status Check API
 * 
 * Usage:
 * 1. Set PAYOS credentials in .env file
 * 2. Run: node scripts/test-payment-status.js
 */

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.PUBLIC_SITE_URL || 'http://localhost:4321';

// Test data
const testOrderCode = process.argv[2] || '123456';

console.log('🧪 Testing Payment Status Check API...\n');
console.log('📍 Base URL:', BASE_URL);
console.log('📦 Order Code:', testOrderCode);
console.log('\n⏳ Checking payment status...\n');

// Test payment status check
fetch(`${BASE_URL}/api/check-payment-status`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ orderCode: testOrderCode }),
})
  .then(response => {
    console.log('📡 Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('📥 Response data:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ SUCCESS! Payment status retrieved');
      console.log('📊 Payment Details:');
      console.log('   Order Code:', data.orderCode);
      console.log('   Status:', data.status);
      console.log('   Is Paid:', data.isPaid);
      if (data.paymentInfo) {
        console.log('   Amount:', data.paymentInfo.amount);
        console.log('   Description:', data.paymentInfo.description);
        console.log('   Created At:', data.paymentInfo.createdAt);
        console.log('   Updated At:', data.paymentInfo.updatedAt);
      }
    } else {
      console.log('\n❌ FAILED! Error from API:');
      console.log('Error message:', data.message);
    }
  })
  .catch(error => {
    console.log('\n❌ ERROR:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure the server is running');
    console.log('2. Check if the API endpoint is accessible');
    console.log('3. Verify PayOS credentials are configured');
    console.log('4. Check if the order code exists in PayOS');
  });
