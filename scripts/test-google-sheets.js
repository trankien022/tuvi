/**
 * Test script for Google Sheets API
 * 
 * Usage:
 * 1. Set GOOGLE_SHEETS_SCRIPT_URL in .env file
 * 2. Run: node scripts/test-google-sheets.js
 */

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_SHEETS_URL = process.env.PUBLIC_GOOGLE_SHEETS_SCRIPT_URL;

if (!GOOGLE_SHEETS_URL) {
  console.error('❌ Error: PUBLIC_GOOGLE_SHEETS_SCRIPT_URL is not set in .env file');
  console.log('\nPlease follow these steps:');
  console.log('1. Set up Google Sheets and Apps Script (see docs/GOOGLE_APPS_SCRIPT.md)');
  console.log('2. Add PUBLIC_GOOGLE_SHEETS_SCRIPT_URL to your .env file');
  process.exit(1);
}

// Test data
const testData = {
  fullName: 'Test User',
  phone: '0912345678',
  email: 'test@example.com',
  birthDay: '15',
  birthMonth: '6',
  birthYear: '1990',
  birthHour: '09:00-11:00 (Tỵ)',
  gender: 'Nam',
  address: 'Hà Nội',
  specialQuestion: 'Test question from automated script',
  packageName: 'Tử Vi Trọn Đời',
  price: '599000',
  orderCode: `TEST${Date.now()}`,
};

console.log('🧪 Testing Google Sheets API...\n');
console.log('📍 URL:', GOOGLE_SHEETS_URL);
console.log('📦 Test data:', JSON.stringify(testData, null, 2));
console.log('\n⏳ Sending request...\n');

// Send POST request
fetch(GOOGLE_SHEETS_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData),
  redirect: 'follow',
})
  .then(response => {
    console.log('📡 Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('📥 Response data:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n✅ SUCCESS! Data was saved to Google Sheets');
      console.log('📝 Check your Google Sheet to verify the data was added');
    } else {
      console.log('\n❌ FAILED! Error from Google Sheets:');
      console.log('Error message:', data.message);
    }
  })
  .catch(error => {
    console.log('\n❌ ERROR:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Verify your Apps Script is deployed as a Web App');
    console.log('2. Make sure "Who has access" is set to "Anyone"');
    console.log('3. Check if the URL is correct');
    console.log('4. Review Apps Script execution logs for errors');
  });

