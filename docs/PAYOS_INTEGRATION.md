# PayOS Integration Guide

## Overview

This document describes the PayOS payment gateway integration using PayOS Node SDK v2.

## SDK Version

- **Package**: `@payos/node`
- **Version**: `^2.0.3`

## Important Changes in v2

PayOS SDK v2 has significant API changes compared to v1:

### 1. Import Method

```typescript
// ✅ Correct - Use named import
import { PayOS } from '@payos/node';

// ❌ Incorrect - Default import doesn't work
import PayOS from '@payos/node';
```

### 2. API Method

```typescript
// ✅ Correct - Use paymentRequests.create()
const response = await payOS.paymentRequests.create(paymentData);

// ❌ Incorrect - Old v1 API
const response = await payOS.createPaymentLink(paymentData);
```

### 3. PayOS Instance Structure

```typescript
const payOS = new PayOS(clientId, apiKey, checksumKey);

// Available resources:
// - payOS.paymentRequests  (create, get, cancel)
// - payOS.invoices
// - payOS.payouts
// - payOS.payoutsAccount
// - payOS.webhooks
```

## Configuration

### Environment Variables

```env
PAYOS_CLIENT_ID=your-client-id
PAYOS_API_KEY=your-api-key
PAYOS_CHECKSUM_KEY=your-checksum-key
```

Get these credentials from [PayOS Dashboard](https://my.payos.vn/).

## Usage Example

### Creating a Payment Link

```typescript
import { PayOS } from '@payos/node';

const payOS = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

const paymentData = {
  orderCode: 123456,
  amount: 10000,
  description: 'Payment for order #123456',
  returnUrl: 'https://yoursite.com/payment-success',
  cancelUrl: 'https://yoursite.com/payment-cancel',
  items: [
    {
      name: 'Product name',
      quantity: 1,
      price: 10000,
    },
  ],
  // Optional fields
  buyerName: 'Nguyen Van A',
  buyerEmail: 'email@example.com',
  buyerPhone: '0123456789',
};

const response = await payOS.paymentRequests.create(paymentData);

console.log('Checkout URL:', response.checkoutUrl);
console.log('Payment Link ID:', response.paymentLinkId);
```

### Response Structure

```typescript
{
  bin: "970452",
  accountNumber: "10142510117516894",
  accountName: "TRAN NGOC TRUNG KIEN",
  amount: 10000,
  description: "Test payment",
  orderCode: 483030,
  currency: "VND",
  paymentLinkId: "62dc6930247c4aabad3dddabc8dd25d2",
  status: "PENDING",
  checkoutUrl: "https://pay.payos.vn/web/62dc6930247c4aabad3dddabc8dd25d2",
  qrCode: "00020101021238610010A000000727..."
}
```

## Testing

Run the test script to verify PayOS integration:

```bash
node scripts/test-payos.js
```

This will:
1. Check credentials
2. Create PayOS instance
3. Create a test payment link
4. Display the checkout URL

## Troubleshooting

### Error: "PayOS is not a constructor"

**Cause**: Using default import instead of named import.

**Solution**: Use named import `{ PayOS }` instead of default import.

```typescript
// ✅ Correct
import { PayOS } from '@payos/node';

// ❌ Wrong
import PayOS from '@payos/node';
```

### Error: "payOS.createPaymentLink is not a function"

**Cause**: Using old v1 API method.

**Solution**: Use v2 API method `paymentRequests.create()`.

```typescript
// ✅ Correct
await payOS.paymentRequests.create(paymentData);

// ❌ Wrong
await payOS.createPaymentLink(paymentData);
```

### Error: 500 Internal Server Error

**Possible causes**:
1. Invalid credentials
2. Incorrect payment data format
3. Missing required fields

**Solution**:
1. Verify credentials in `.env` file
2. Check console logs for detailed error messages
3. Ensure all required fields are provided:
   - `orderCode` (unique number)
   - `amount` (integer, in VND)
   - `description` (string)
   - `returnUrl` (valid URL)
   - `cancelUrl` (valid URL)
   - `items` (array with at least one item)

## Webhook Integration

PayOS will send webhook notifications to your configured endpoint when payment status changes.

### Webhook Data Structure

```typescript
{
  code: "00",
  desc: "success",
  success: true,
  data: {
    orderCode: 123,
    amount: 3000,
    description: "VQRIO123",
    accountNumber: "12345678",
    reference: "TF230204212323",
    transactionDateTime: "2023-02-04 18:25:00",
    currency: "VND",
    paymentLinkId: "124c33293c43417ab7879e14c8d9eb18",
    code: "00",
    desc: "Thành công",
    counterAccountBankId: "",
    counterAccountBankName: "",
    counterAccountName: "",
    counterAccountNumber: "",
    virtualAccountName: "",
    virtualAccountNumber: ""
  },
  signature: "8d8640d802576397a1ce45ebda7f835055768ac7..."
}
```

### Verifying Webhook Signature

Always verify the webhook signature to ensure the data comes from PayOS:

```typescript
import { PayOS } from '@payos/node';

const payOS = new PayOS(clientId, apiKey, checksumKey);

// Verify webhook data
const isValid = payOS.webhooks.verifyWebhookData(webhookData);

if (isValid) {
  // Process payment confirmation
} else {
  // Reject invalid webhook
}
```

## Resources

- [PayOS Documentation](https://payos.vn/docs/)
- [PayOS API Reference](https://payos.vn/docs/api/)
- [PayOS Dashboard](https://my.payos.vn/)
- [PayOS Node SDK GitHub](https://github.com/payOSHQ/node-sdk)

## Support

For PayOS support, contact: <support@payos.vn>

