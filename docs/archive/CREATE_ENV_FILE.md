# Hướng dẫn tạo file .env

## Cách 1: Tạo thủ công trong VS Code/Cursor

1. Trong Cursor/VS Code, click **File** → **New File**
2. Lưu file với tên: `.env` (trong thư mục root)
3. Copy nội dung bên dưới vào file `.env`

## Cách 2: Dùng Command Line

### Windows (PowerShell):
```powershell
New-Item -Path .env -ItemType File
```

### Windows (Command Prompt):
```cmd
type nul > .env
```

### Linux/Mac:
```bash
touch .env
```

## Nội dung file .env

Copy toàn bộ nội dung này vào file `.env`:

```env
# ==============================================
# PAYOS CONFIGURATION
# ==============================================
# Get your credentials from: https://my.payos.vn/
# Go to: Dashboard → Settings → API Credentials

PAYOS_CLIENT_ID=your_client_id_here
PAYOS_API_KEY=your_api_key_here
PAYOS_CHECKSUM_KEY=your_checksum_key_here

# ==============================================
# GOOGLE SHEETS CONFIGURATION
# ==============================================
# Follow the setup guide in: docs/GOOGLE_APPS_SCRIPT.md
# After deploying your Apps Script as a Web App, paste the URL here
# URL format: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

PUBLIC_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

# ==============================================
# SITE CONFIGURATION
# ==============================================
# Your website URL (used for PayOS callbacks)
# Development: http://localhost:4321
# Production: https://your-domain.vercel.app

PUBLIC_SITE_URL=http://localhost:4321
```

## Sau khi tạo file .env

### Bước 1: Setup Google Sheets (5-10 phút)

Xem hướng dẫn chi tiết: `docs/GOOGLE_APPS_SCRIPT.md`

1. Tạo Google Sheet mới
2. Thêm các cột header (xem trong docs)
3. Tạo Apps Script với code mẫu
4. Deploy as Web App với quyền "Anyone"
5. Copy URL deployment
6. Paste vào `PUBLIC_GOOGLE_SHEETS_SCRIPT_URL` trong file `.env`

### Bước 2: Setup PayOS (5 phút)

1. Đăng ký tại: https://payos.vn/
2. Hoàn tất KYC (nếu cần)
3. Vào Dashboard → Settings → API Credentials
4. Copy 3 giá trị:
   - Client ID
   - API Key
   - Checksum Key
5. Paste vào file `.env` của bạn

### Bước 3: Test

```bash
# Test Google Sheets connection
npm run test:sheets

# Start dev server
npm run dev
```

## Ví dụ file .env đã điền

```env
# PAYOS (ví dụ - không phải thật)
PAYOS_CLIENT_ID=abc123-def456-ghi789
PAYOS_API_KEY=xyz789uvw456rst123
PAYOS_CHECKSUM_KEY=checksum_key_example_here

# GOOGLE SHEETS (ví dụ)
PUBLIC_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXX/exec

# SITE URL
PUBLIC_SITE_URL=http://localhost:4321
```

## Quan trọng!

- ❌ **KHÔNG COMMIT** file `.env` vào git
- ✅ File `.env` đã có trong `.gitignore`
- ✅ Mỗi môi trường (dev/production) cần file `.env` riêng
- ✅ Trong Vercel, thêm environment variables ở Dashboard

## Troubleshooting

### File .env không được đọc?

1. Đảm bảo file nằm ở thư mục root (cùng cấp `package.json`)
2. Restart dev server sau khi thay đổi `.env`
3. Kiểm tra tên biến có đúng không (case-sensitive)

### Lỗi "environment variable not found"?

- Kiểm tra tên biến có đúng không
- Không có dấu cách quanh dấu `=`
- Không cần quotes cho giá trị (trừ khi có space)

## Need Help?

Xem thêm:
- `docs/SETUP_GUIDE.md` - Hướng dẫn setup đầy đủ
- `docs/ENVIRONMENT_SETUP.md` - Chi tiết về environment variables
- `docs/GOOGLE_APPS_SCRIPT.md` - Setup Google Sheets

