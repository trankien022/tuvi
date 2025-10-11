# PayOS Payment Link Error Fix

## Problem

When trying to create a payment link through the registration form, the application was throwing a **500 Internal Server Error**:

```
Failed to load resource: the server responded with a status of 500 (Internal Server Error)
Submit error: Error: Lỗi khi tạo link thanh toán
```

## Root Cause

The issue was caused by using **PayOS SDK v1 API methods** with **PayOS SDK v2** (`@payos/node@^2.0.3`).

### Specific Issues

1. **Incorrect Import Method**
   ```typescript
   // ❌ Old code (v1)
   const { default: PayOS } = await import('@payos/node');
   
   // ✅ Fixed (v2)
   const { PayOS } = await import('@payos/node');
   ```

2. **Incorrect API Method**
   ```typescript
   // ❌ Old code (v1)
   const response = await payOS.createPaymentLink(paymentData);
   
   // ✅ Fixed (v2)
   const response = await payOS.paymentRequests.create(paymentData);
   ```

## Solution

### 1. Updated Import Statement

Changed from default import to named import:

```typescript
// src/pages/api/create-payment-link.ts
const { PayOS } = await import('@payos/node');
```

### 2. Updated API Call

Changed from v1 API to v2 API:

```typescript
// v2 uses paymentRequests resource
const paymentLinkResponse = await payOS.paymentRequests.create(paymentData);
```

### 3. Added Debug Logging

Enhanced error logging to help identify future issues:

```typescript
console.log('Received request body:', body);
console.log('PayOS Credentials check:', {
  hasClientId: !!clientId,
  hasApiKey: !!apiKey,
  hasChecksumKey: !!checksumKey,
  clientIdLength: clientId?.length || 0,
  apiKeyLength: apiKey?.length || 0,
  checksumKeyLength: checksumKey?.length || 0,
});
console.log('URLs:', { baseUrl, returnUrl, cancelUrl });
console.log('Creating PayOS payment link with data:', paymentData);
console.log('PayOS response:', paymentLinkResponse);
```

## Testing

### Test Script

Created `scripts/test-payos.js` to test PayOS integration directly:

```bash
node scripts/test-payos.js
```

**Test Results:**
```
✓ PayOS instance created successfully
✓ Payment link created successfully
✓ Checkout URL: https://pay.payos.vn/web/62dc6930247c4aabad3dddabc8dd25d2
```

### Manual Testing

1. Open the registration form
2. Fill in all required fields
3. Select a package
4. Submit the form
5. Verify that:
   - No error messages appear
   - User is redirected to PayOS checkout page
   - Payment information is correct

## Files Changed

1. **src/pages/api/create-payment-link.ts**
   - Updated PayOS import method
   - Changed API call from `createPaymentLink()` to `paymentRequests.create()`
   - Enhanced error logging

2. **scripts/test-payos.js** (New)
   - Test script to verify PayOS integration
   - Helps debug PayOS API issues

3. **docs/PAYOS_INTEGRATION.md** (New)
   - Complete guide for PayOS SDK v2
   - API usage examples
   - Troubleshooting section

4. **docs/PAYOS_FIX.md** (This file)
   - Documentation of the fix
   - Root cause analysis

## PayOS SDK v2 Key Changes

### Module Structure

```typescript
import { PayOS } from '@payos/node';

const payOS = new PayOS(clientId, apiKey, checksumKey);

// Available resources:
payOS.paymentRequests  // For payment links
payOS.invoices         // For invoices
payOS.payouts          // For payouts
payOS.payoutsAccount   // For payout accounts
payOS.webhooks         // For webhook verification
```

### Payment Request API

```typescript
// Create payment link
await payOS.paymentRequests.create(data);

// Get payment details
await payOS.paymentRequests.get(orderCode);

// Cancel payment
await payOS.paymentRequests.cancel(orderCode);
```

## Verification

To verify the fix is working:

1. **Check Server Logs**
   - Should see "PayOS instance created successfully"
   - Should see "PayOS response:" with checkout URL
   - No errors about "PayOS is not a constructor"
   - No errors about "createPaymentLink is not a function"

2. **Check Browser Console**
   - No 500 errors
   - Should see redirect to PayOS checkout page

3. **Check PayOS Dashboard**
   - Payment link should be created
   - Order code should match
   - Amount should be correct

## Prevention

To prevent similar issues in the future:

1. **Always check SDK version** when upgrading packages
2. **Read migration guides** when major versions change
3. **Test integration** after SDK updates
4. **Keep documentation updated** with current API methods
5. **Add comprehensive logging** for third-party API calls

## References

- [PayOS SDK v2 Documentation](https://payos.vn/docs/)
- [PayOS Node SDK GitHub](https://github.com/payOSHQ/node-sdk)
- [PAYOS_INTEGRATION.md](./PAYOS_INTEGRATION.md)

## Status

✅ **FIXED** - Payment link creation now works correctly with PayOS SDK v2.

## Date

October 11, 2025

