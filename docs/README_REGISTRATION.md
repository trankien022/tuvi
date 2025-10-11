# 🎯 Tính năng Đăng ký Mua Gói

Tính năng đăng ký mua gói tử vi với form nhiều bước, tích hợp Google Sheets và thanh toán PayOS.

## ✨ Tính năng chính

- ✅ Form đăng ký 4 bước với UI đẹp (shadcn/ui)
- ✅ Validation real-time cho từng bước
- ✅ Lưu dữ liệu tự động vào Google Sheets
- ✅ Tích hợp thanh toán PayOS
- ✅ Trang xác nhận thanh toán thành công/hủy
- ✅ Responsive design cho mobile & desktop
- ✅ Toast notifications cho UX tốt hơn

## 📁 Files đã tạo/cập nhật

### Components mới
```
src/components/features/registration/
├── RegistrationForm.tsx      # Form chính 4 bước
├── StepIndicator.tsx          # Progress indicator
├── PackageInfoCard.tsx        # Hiển thị thông tin gói
├── index.ts                   # Exports
└── README.md                  # Component docs
```

### Pages mới
```
src/pages/
├── register.astro             # Trang đăng ký
├── payment-success.astro      # Trang thanh toán thành công
├── payment-cancel.astro       # Trang hủy thanh toán
└── api/
    └── create-payment-link.ts # API endpoint PayOS
```

### Types
```
src/types/registration.ts      # Type definitions & constants
```

### shadcn/ui components đã cài
```
src/components/ui/
├── input.tsx
├── label.tsx
├── select.tsx
├── radio-group.tsx
├── dialog.tsx
├── toast.tsx
└── toaster.tsx

src/hooks/
└── use-toast.ts
```

### Documentation
```
docs/
├── GOOGLE_APPS_SCRIPT.md      # Setup Google Sheets & Apps Script
├── ENVIRONMENT_SETUP.md       # Cấu hình environment variables
├── REGISTRATION_FEATURE.md    # Documentation đầy đủ
└── SETUP_GUIDE.md            # Hướng dẫn setup chi tiết
```

### Scripts & Config
```
scripts/
└── test-google-sheets.js     # Test Google Sheets integration

CHANGELOG_REGISTRATION.md     # Changelog chi tiết
README_REGISTRATION.md        # File này
```

## 🚀 Quick Start

### 1. Cài đặt dependencies

```bash
npm install
```

Dependencies đã được cài (shadcn components + PayOS SDK).

### 2. Setup Google Sheets

Xem hướng dẫn chi tiết: [`docs/GOOGLE_APPS_SCRIPT.md`](docs/GOOGLE_APPS_SCRIPT.md)

Tóm tắt:
1. Tạo Google Sheet mới
2. Tạo Apps Script với code mẫu
3. Deploy as Web App
4. Lấy deployment URL

### 3. Setup PayOS

1. Đăng ký tài khoản tại [PayOS](https://payos.vn/)
2. Lấy API credentials từ Dashboard
3. Copy Client ID, API Key, Checksum Key

### 4. Cấu hình .env

Tạo file `.env`:

```env
# PayOS
PAYOS_CLIENT_ID=your_client_id
PAYOS_API_KEY=your_api_key
PAYOS_CHECKSUM_KEY=your_checksum_key

# Google Sheets
PUBLIC_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec

# Site URL
PUBLIC_SITE_URL=http://localhost:4321
```

### 5. Test Google Sheets (Optional)

```bash
npm run test:sheets
```

### 6. Chạy dev server

```bash
npm run dev
```

Open `http://localhost:4321` → Scroll to Pricing → Click "Chọn gói này"

## 📖 Documentation đầy đủ

- **Setup Guide**: [`docs/SETUP_GUIDE.md`](docs/SETUP_GUIDE.md) - Hướng dẫn setup từng bước
- **Feature Docs**: [`docs/REGISTRATION_FEATURE.md`](docs/REGISTRATION_FEATURE.md) - Chi tiết kỹ thuật
- **Google Sheets**: [`docs/GOOGLE_APPS_SCRIPT.md`](docs/GOOGLE_APPS_SCRIPT.md) - Setup Apps Script
- **Environment**: [`docs/ENVIRONMENT_SETUP.md`](docs/ENVIRONMENT_SETUP.md) - Cấu hình env vars

## 🔄 Luồng hoạt động

```
User clicks "Chọn gói này"
    ↓
Redirect to /register?packageId=...&packageName=...&price=...
    ↓
Fill form (4 steps) with validation
    ↓
Submit → Save to Google Sheets
    ↓
Create PayOS payment link
    ↓
Redirect to PayOS checkout
    ↓
User pays
    ↓
Success → /payment-success
Cancel → /payment-cancel
```

## 🧪 Testing

### Manual Testing

1. Click "Chọn gói này" trong Pricing section
2. Điền form qua 4 bước
3. Submit và xem data trong Google Sheets
4. Complete thanh toán trong PayOS
5. Verify redirect về success/cancel page

### Automated Testing

```bash
# Test Google Sheets integration
npm run test:sheets

# Test full app
npm run test

# E2E tests
npm run test:e2e
```

## 🚢 Deployment (Vercel)

1. Push code lên GitHub
2. Import project vào Vercel
3. Thêm environment variables trong Vercel Dashboard
4. Deploy

Chi tiết: [`docs/SETUP_GUIDE.md#bước-7-deploy-lên-vercel`](docs/SETUP_GUIDE.md#bước-7-deploy-lên-vercel)

## 🐛 Troubleshooting

### Lỗi thường gặp

**1. "Payment system is not configured properly"**
- Kiểm tra PayOS credentials trong `.env`

**2. "Failed to save data to Google Sheets"**
- Verify Apps Script URL
- Check Apps Script deployment permissions

**3. Form không submit**
- Check console for errors
- Verify all required fields filled

Xem thêm: [`docs/SETUP_GUIDE.md#troubleshooting`](docs/SETUP_GUIDE.md#troubleshooting)

## 📦 Dependencies

### New dependencies (via shadcn)
- `@radix-ui/react-dialog`
- `@radix-ui/react-select`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-label`
- `@radix-ui/react-toast`

### Existing dependencies used
- `@payos/node` - PayOS SDK
- `react`, `react-dom` - React framework
- `lucide-react` - Icons

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/):
- Input fields
- Select dropdowns
- Radio groups
- Cards
- Buttons
- Badges
- Toast notifications
- Dialog modals

## 🔒 Security Notes

- Environment variables không được commit (`.gitignore`)
- API keys được bảo vệ server-side
- Client-side validation + server-side validation
- PayOS handles sensitive payment data
- Google Sheets Apps Script với proper permissions

## 🎯 Next Steps

Sau khi setup xong:

1. ✅ Test locally với dev environment
2. ✅ Verify Google Sheets nhận được data
3. ✅ Test PayOS payment flow (test mode)
4. ✅ Deploy to Vercel
5. ✅ Test trên production
6. ✅ Monitor logs trong vài ngày đầu

## 🙋 Support

Nếu cần hỗ trợ:
1. Xem documentation trong `docs/`
2. Check troubleshooting section
3. Review console logs và network requests
4. Check Google Apps Script execution logs
5. Verify PayOS dashboard for payment info

---

Made with ❤️ for Tử Vi Trúc Nghi

