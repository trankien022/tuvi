# Setup Guide - Tính năng Đăng ký Mua Gói

Hướng dẫn chi tiết để cài đặt và chạy tính năng đăng ký mua gói với Google Sheets và PayOS.

## 📋 Prerequisites

- Node.js 20.x
- npm hoặc yarn
- Tài khoản Google (cho Google Sheets)
- Tài khoản PayOS (cho payment gateway)

## 🚀 Bước 1: Cài đặt Dependencies

Tất cả dependencies đã được cài đặt khi chạy `npm install`. Các package chính:
- `@payos/node`: PayOS SDK
- `@radix-ui/*`: UI components từ shadcn/ui
- Các shadcn components: input, label, select, radio-group, dialog, toast

## 🔧 Bước 2: Cấu hình Google Sheets

### 2.1. Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo Sheet mới với tên: **Tử Vi Trúc Nghi - Đăng ký**
3. Thêm header row với các cột:
   ```
   Timestamp | Họ tên | Số điện thoại | Email | Ngày sinh | Tháng sinh | Năm sinh | Giờ sinh | Giới tính | Địa chỉ | Câu hỏi đặc biệt | Gói đã chọn | Giá (VND) | Trạng thái thanh toán | Order Code
   ```

### 2.2. Tạo Apps Script

1. Trong Google Sheet, click **Extensions** → **Apps Script**
2. Xóa code mặc định
3. Copy code từ file `docs/GOOGLE_APPS_SCRIPT.md`
4. Paste vào Apps Script editor
5. Lưu project (Ctrl+S / Cmd+S)

### 2.3. Deploy Apps Script

1. Click **Deploy** → **New deployment**
2. Click icon ⚙️ → chọn **Web app**
3. Cấu hình:
   - **Description**: "Nhận dữ liệu đăng ký"
   - **Execute as**: Me (your email)
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. **Copy Web app URL** (dạng: `https://script.google.com/macros/s/.../exec`)
6. Lưu URL này để dùng trong bước 4

### 2.4. Test Apps Script (Optional)

Dùng curl để test:
```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","phone":"0123456789","email":"test@example.com","packageName":"Test Package","price":"100000","orderCode":"TEST123"}'
```

Kiểm tra Google Sheet xem dữ liệu có được thêm vào không.

## 💳 Bước 3: Cấu hình PayOS

### 3.1. Đăng ký PayOS

1. Truy cập [PayOS](https://payos.vn/)
2. Đăng ký tài khoản business
3. Hoàn tất KYC (nếu cần)

### 3.2. Lấy API Credentials

1. Login vào [PayOS Dashboard](https://my.payos.vn/)
2. Vào **Settings** → **API Credentials**
3. Copy 3 giá trị:
   - **Client ID**
   - **API Key**
   - **Checksum Key**

### 3.3. Test Mode (Optional)

PayOS có test mode để test mà không cần thanh toán thật. Kiểm tra documentation của PayOS để biết cách enable test mode.

## 🔐 Bước 4: Cấu hình Environment Variables

### 4.1. Tạo file `.env`

Tạo file `.env` trong thư mục root:

```env
# PayOS Configuration
PAYOS_CLIENT_ID=your_client_id_here
PAYOS_API_KEY=your_api_key_here
PAYOS_CHECKSUM_KEY=your_checksum_key_here

# Google Sheets Apps Script URL
PUBLIC_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

# Site URL (optional, for local dev use localhost)
PUBLIC_SITE_URL=http://localhost:4321
```

### 4.2. Thay thế các giá trị

- Thay `your_client_id_here` bằng Client ID từ PayOS
- Thay `your_api_key_here` bằng API Key từ PayOS
- Thay `your_checksum_key_here` bằng Checksum Key từ PayOS
- Thay `YOUR_DEPLOYMENT_ID` bằng ID từ Apps Script URL

### 4.3. Verify

Đảm bảo file `.env` không bị commit vào git (đã có trong `.gitignore`).

## ▶️ Bước 5: Chạy Development Server

```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:4321`

## 🧪 Bước 6: Test Tính năng

### 6.1. Test Flow đầy đủ

1. Mở `http://localhost:4321`
2. Scroll đến phần **Bảng giá**
3. Click **Chọn gói này** ở một gói bất kỳ
4. Sẽ redirect đến trang `/register`
5. Điền form qua 4 bước:
   - Step 1: Xem thông tin gói
   - Step 2: Nhập thông tin liên hệ
   - Step 3: Nhập thông tin sinh
   - Step 4: Xác nhận
6. Click **Thanh toán**
7. Nếu thành công, sẽ redirect đến PayOS checkout page

### 6.2. Kiểm tra Google Sheets

Sau khi submit form, kiểm tra Google Sheet xem dữ liệu đã được lưu chưa.

### 6.3. Test PayOS

- PayOS sẽ hiển thị QR code để scan và thanh toán
- Nếu test mode: có thể dùng test cards
- Production: dùng app ngân hàng thật

### 6.4. Test Callback Pages

- Thanh toán thành công: Sẽ về `/payment-success`
- Hủy thanh toán: Sẽ về `/payment-cancel`

## 🌐 Bước 7: Deploy lên Vercel

### 7.1. Push code lên GitHub

```bash
git add .
git commit -m "Add registration feature with PayOS and Google Sheets"
git push origin main
```

### 7.2. Deploy trên Vercel

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Import project từ GitHub
3. Vercel sẽ tự detect Astro project

### 7.3. Thêm Environment Variables

Trong Vercel Dashboard → Project Settings → Environment Variables, thêm:

```
PAYOS_CLIENT_ID=...
PAYOS_API_KEY=...
PAYOS_CHECKSUM_KEY=...
PUBLIC_GOOGLE_SHEETS_SCRIPT_URL=...
PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**Lưu ý:** Thay `PUBLIC_SITE_URL` bằng domain thật của bạn.

### 7.4. Deploy

Click **Deploy** và đợi Vercel build & deploy.

### 7.5. Update PayOS Webhook (Optional)

Nếu muốn nhận webhook từ PayOS khi payment status thay đổi:
1. Vào PayOS Dashboard → Webhooks
2. Thêm webhook URL: `https://your-domain.vercel.app/api/payos-webhook`
3. (Cần tạo endpoint này nếu muốn dùng)

## 🐛 Troubleshooting

### Lỗi: "Payment system is not configured properly"

**Nguyên nhân:** Environment variables PayOS chưa được set hoặc sai.

**Giải pháp:**
- Kiểm tra file `.env` có đầy đủ 3 biến: `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY`
- Verify credentials từ PayOS Dashboard
- Restart dev server sau khi thay đổi `.env`

### Lỗi: "Failed to save data to Google Sheets"

**Nguyên nhân:** Apps Script URL sai hoặc quyền truy cập bị chặn.

**Giải pháp:**
- Kiểm tra `PUBLIC_GOOGLE_SHEETS_SCRIPT_URL` đúng chưa
- Verify Apps Script đã deploy với "Who has access: Anyone"
- Kiểm tra Apps Script logs: Apps Script Editor → Executions

### Form không submit hoặc validation lỗi

**Giải pháp:**
- Mở DevTools Console (F12) để xem error messages
- Kiểm tra Network tab cho failed requests
- Đảm bảo tất cả required fields đã được điền

### PayOS checkout không load

**Nguyên nhân:** PayOS credentials sai hoặc amount không hợp lệ.

**Giải pháp:**
- Kiểm tra credentials từ PayOS Dashboard
- Verify amount > 0 và là số nguyên
- Check PayOS API limits và rate limiting

### Redirect về localhost thay vì production URL

**Nguyên nhân:** `PUBLIC_SITE_URL` chưa được set đúng.

**Giải pháp:**
- Trong production, set `PUBLIC_SITE_URL` thành domain thật
- Vercel Environment Variables phải có `PUBLIC_SITE_URL=https://your-domain.vercel.app`

## 📚 Documentation Links

- [Google Apps Script Guide](./GOOGLE_APPS_SCRIPT.md)
- [Environment Setup](./ENVIRONMENT_SETUP.md)
- [Registration Feature Documentation](./REGISTRATION_FEATURE.md)
- [PayOS Documentation](https://payos.vn/docs/)

## ✅ Checklist

Trước khi deploy production:

- [ ] Google Sheet đã được tạo với đúng columns
- [ ] Apps Script đã deploy và test thành công
- [ ] PayOS credentials đã lấy và test
- [ ] Environment variables đã set đầy đủ
- [ ] Test local development hoàn chỉnh
- [ ] Test form validation
- [ ] Test Google Sheets integration
- [ ] Test PayOS payment flow
- [ ] Test callback pages (success/cancel)
- [ ] Deploy lên Vercel thành công
- [ ] Test trên production URL
- [ ] Monitor errors trong vài ngày đầu

## 🆘 Support

Nếu gặp vấn đề, hãy:
1. Check console logs và network requests
2. Xem Apps Script execution logs
3. Check PayOS Dashboard cho payment history
4. Review documentation files trong `docs/`

Good luck! 🚀

