# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

### PayOS Configuration

Get your credentials from [PayOS Dashboard](https://my.payos.vn/)

```env
PAYOS_CLIENT_ID=your_client_id_here
PAYOS_API_KEY=your_api_key_here
PAYOS_CHECKSUM_KEY=your_checksum_key_here
```

**How to get PayOS credentials:**

1. Sign up or login to [PayOS](https://payos.vn/)
2. Go to Dashboard → Settings → API Credentials
3. Copy your Client ID, API Key, and Checksum Key
4. Paste them into your `.env` file

### Google Sheets Apps Script URL

Follow the instructions in [GOOGLE_APPS_SCRIPT.md](./GOOGLE_APPS_SCRIPT.md) to set up Google Sheets and get the deployment URL.

```env
PUBLIC_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

**Note:** The `PUBLIC_` prefix makes this variable accessible in the browser.

### Site URL (Optional)

Used for PayOS payment callbacks. If not set, will default to site URL from Astro config.

```env
PUBLIC_SITE_URL=https://trucnghi.vercel.app
```

## Example `.env` file

```env
# PayOS Configuration
PAYOS_CLIENT_ID=abc123-def456-ghi789
PAYOS_API_KEY=xyz789-uvw456-rst123
PAYOS_CHECKSUM_KEY=checksum_key_here

# Google Sheets Apps Script
PUBLIC_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXX/exec

# Site URL
PUBLIC_SITE_URL=https://trucnghi.vercel.app
```

## Vercel Deployment

When deploying to Vercel, add these environment variables in:

**Project Settings → Environment Variables**

Add each variable with its value and select the appropriate environment (Production, Preview, Development).

## Testing

You can test if your environment variables are set correctly:

1. For PayOS: Try creating a test payment through the registration flow
2. For Google Sheets: Check if data is being saved after form submission

## Security Notes

- Never commit your `.env` file to git
- Keep your API keys secure and private
- Rotate keys periodically for security
- Use different credentials for development and production

