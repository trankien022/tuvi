# Troubleshooting PayOS 500 Error

## Error Description

```
Failed to load resource: the server responded with a status of 500 (Internal Server Error)
Submit error: Error: Lỗi khi tạo link thanh toán
```

## Quick Fixes Applied

### 1. Added `site` Configuration to Astro Config

**Problem:** The API endpoint couldn't determine the base URL for PayOS callback URLs (returnUrl, cancelUrl).

**Fix:** Added `site` property to `astro.config.ts`:

```typescript
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://trucnghi.vercel.app',
  // ... rest of config
});
```

### 2. Enhanced URL Detection

**Problem:** Single source for base URL could fail.

**Fix:** Added multiple fallback sources in `src/pages/api/create-payment-link.ts`:

```typescript
// Try multiple sources for base URL
const siteUrl = site?.toString()?.replace(/\/$/, '');
const envUrl = import.meta.env.PUBLIC_SITE_URL;
const baseUrl = siteUrl || envUrl || 'https://trucnghi.vercel.app';
```

### 3. Improved Error Logging

**Problem:** Generic error messages made debugging difficult.

**Fix:** Added detailed error logging to capture PayOS API responses:

```typescript
// Now logs:
// - HTTP status codes
// - Response data from PayOS
// - Request details
// - Full error stack traces
```

## Testing Steps

### 1. Restart Development Server

If you're running the dev server, restart it to pick up the new configuration:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### 2. Test the Registration Form

1. Open your browser to `http://localhost:4321`
2. Navigate to the registration page
3. Fill out the form with test data
4. Submit the form
5. Check both:
   - Browser console (F12 → Console tab)
   - Terminal/Server logs

### 3. Check Server Logs

Look for these log entries in your terminal:

```
✓ Good signs:
  - "PayOS instance created successfully"
  - "Creating PayOS payment link with data:"
  - "PayOS response:" followed by checkout URL

✗ Bad signs:
  - "PayOS credentials are not configured"
  - "PayOS API Error:"
  - HTTP status codes 400, 401, 403, 500
```

## Common Issues & Solutions

### Issue 1: Missing Environment Variables

**Symptoms:**
- Error: "Payment system is not configured properly"
- Log: "PayOS credentials are not configured"

**Solution:**
1. Check your `.env` file exists in the project root
2. Verify all PayOS credentials are present:
   ```env
   PAYOS_CLIENT_ID=your_client_id
   PAYOS_API_KEY=your_api_key
   PAYOS_CHECKSUM_KEY=your_checksum_key
   ```
3. Restart the dev server after adding/changing `.env`

### Issue 2: Invalid PayOS Credentials

**Symptoms:**
- HTTP 401 Unauthorized error
- PayOS API returns authentication error

**Solution:**
1. Login to [PayOS Dashboard](https://my.payos.vn/)
2. Go to Settings → API Credentials
3. Copy the credentials exactly as shown
4. Update your `.env` file
5. Test with the standalone script:
   ```bash
   node scripts/test-payos.js
   ```

### Issue 3: Invalid Order Code

**Symptoms:**
- HTTP 400 Bad Request
- Error about "orderCode already exists" or "invalid orderCode"

**Solution:**
- The order code must be unique for each transaction
- The code automatically generates a unique timestamp-based code
- If testing repeatedly, wait a few seconds between tests

### Issue 4: Invalid Amount

**Symptoms:**
- HTTP 400 Bad Request
- Error about "amount must be greater than 0"

**Solution:**
- Ensure the package price is correctly set
- Check that the price is a number, not a string
- Minimum amount depends on your PayOS account type

### Issue 5: Network/CORS Issues

**Symptoms:**
- CORS error in browser console
- Network timeout
- ERR_NETWORK or similar

**Solution:**
1. Check your internet connection
2. Verify PayOS API is accessible:
   ```bash
   curl https://api-merchant.payos.vn/
   ```
3. Check if firewall/antivirus is blocking requests

## Debug Mode

### Enable Verbose Logging

The API endpoint now includes detailed logging. Check your server logs for:

```
Received request body: { ... }
PayOS Credentials check: { ... }
URLs: { ... }
Creating PayOS payment link with data: { ... }
PayOS response: { ... }
```

### Test PayOS Directly

Use the test script to verify PayOS works independently:

```bash
node scripts/test-payos.js
```

Expected output:
```
✓ PayOS instance created successfully
✓ Payment link created
  Checkout URL: https://pay.payos.vn/web/...
```

### Inspect Network Requests

1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter for "create-payment-link"
4. Submit the form
5. Click on the failed request
6. Check:
   - **Request Headers**: Are they correct?
   - **Request Payload**: Is the data formatted correctly?
   - **Response**: What error message does the server return?

## Still Not Working?

### 1. Check the Exact Error Message

Look at the server terminal for the full error. Common patterns:

#### Error: "Request failed with status code 401"
- **Cause:** Invalid API credentials
- **Fix:** Verify credentials in PayOS dashboard

#### Error: "Request failed with status code 400"
- **Cause:** Invalid request data
- **Fix:** Check orderCode, amount, and item data

#### Error: "ECONNREFUSED" or "ETIMEDOUT"
- **Cause:** Cannot reach PayOS API
- **Fix:** Check internet connection and firewall

#### Error: "PayOS is not a constructor"
- **Cause:** Wrong import method for PayOS SDK
- **Fix:** Already fixed in code (should not occur)

### 2. Compare with Working Test Script

The test script (`scripts/test-payos.js`) works, so compare:

1. **Credentials**: Same in both?
2. **Payment Data Structure**: Match the format?
3. **API Method**: Using `paymentRequests.create()`?

### 3. Check Vercel Environment Variables

If deployed to Vercel:

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Ensure all PayOS variables are set
5. Redeploy after adding variables

### 4. Enable PayOS SDK Logging

Temporarily add this to see more details:

```typescript
const payOS = new PayOS(clientId, apiKey, checksumKey);
payOS.logLevel = 'debug'; // Add this line
```

## Environment-Specific Issues

### Development (localhost)

- Ensure `.env` file is in project root
- Restart server after `.env` changes
- Check terminal for errors

### Production (Vercel)

- Set environment variables in Vercel dashboard
- Ensure variables are set for "Production" environment
- Redeploy after changing variables
- Check Vercel function logs: Dashboard → Deployments → [latest] → Functions

## Diagnostic Checklist

Run through this checklist:

- [ ] `.env` file exists and has all PayOS credentials
- [ ] Dev server was restarted after `.env` changes
- [ ] `node scripts/test-payos.js` runs successfully
- [ ] Browser console shows no CORS errors
- [ ] Server logs show "PayOS instance created successfully"
- [ ] Network tab shows request is reaching `/api/create-payment-link`
- [ ] PayOS credentials are for the correct environment (sandbox vs production)
- [ ] Internet connection is working
- [ ] No firewall/antivirus blocking the request

## Getting Help

If none of the above works:

1. **Gather Information:**
   - Exact error message from server logs
   - Browser console errors
   - Network tab request/response
   - Output of `node scripts/test-payos.js`

2. **Check PayOS Status:**
   - Visit [PayOS Status Page](https://payos.vn/status) (if available)
   - Check if there's a service outage

3. **Contact PayOS Support:**
   - Email: support@payos.vn
   - Provide: Error logs, API credentials (Client ID only, not secrets)

## Changes Made

### Files Modified

1. **astro.config.ts**
   - Added `site` configuration

2. **src/pages/api/create-payment-link.ts**
   - Enhanced URL detection with multiple fallbacks
   - Added detailed error logging
   - Added axios-style error handling

### Files to Review

- **docs/PAYOS_INTEGRATION.md** - PayOS integration guide
- **docs/PAYOS_FIX.md** - Previous fix documentation
- **scripts/test-payos.js** - Standalone test script

## Next Steps

After applying these fixes:

1. Restart your development server
2. Try submitting the form again
3. Check the server logs for detailed error information
4. If still failing, review the exact error message in the logs
5. Follow the specific solution for that error type

---

**Last Updated:** October 11, 2025  
**Status:** Awaiting user testing with enhanced logging

