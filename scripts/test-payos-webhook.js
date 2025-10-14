/**
 * Test script for PayOS Webhook
 * 
 * Usage:
 * 1. Set GOOGLE_SHEETS_SCRIPT_URL in .env file
 * 2. Run: node scripts/test-payos-webhook.js
 */

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.PUBLIC_SITE_URL || 'http://localhost:4321';

// Test webhook data (simulating PayOS webhook)
const testWebhookData = {
  type: 'payment.status.changed',
  data: {
    orderCode: process.argv[2] || '123456',
    status: process.argv[3] || 'PAID',
    amount: 599000,
    description: 'Tử Vi Trọn Đời - Test Order',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

console.log('🧪 Testing PayOS Webhook...\n');
console.log('📍 Base URL:', BASE_URL);
console.log('📦 Webhook data:', JSON.stringify(testWebhookData, null, 2));
console.log('\n⏳ Sending webhook...\n');

// Test webhook
fetch(`${BASE_URL}/api/payos-webhook`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testWebhookData),
})
  .then(response => {
    console.log('📡 Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('📥 Response data:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ SUCCESS! Webhook processed');
      console.log('📊 Processing Details:');
      console.log('   Order Code:', data.orderCode);
      console.log('   Status:', data.status);
      console.log('   Message:', data.message);
    } else {
      console.log('\n❌ FAILED! Error from webhook:');
      console.log('Error message:', data.message);
    }
  })
  .catch(error => {
    console.log('\n❌ ERROR:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure the server is running');
    console.log('2. Check if the webhook endpoint is accessible');
    console.log('3. Verify Google Sheets integration is configured');
    console.log('4. Check webhook data format');
  });
