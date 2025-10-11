# Tính năng Đăng ký Mua Gói

## Tổng quan

Tính năng đăng ký mua gói cho phép khách hàng:
1. Chọn gói dịch vụ từ trang pricing
2. Điền thông tin qua form nhiều bước (multi-step form)
3. Dữ liệu được lưu vào Google Sheets
4. Tạo link thanh toán qua PayOS
5. Thanh toán và nhận xác nhận

## Cấu trúc Components

### 1. Registration Components

Location: `src/components/features/registration/`

#### RegistrationForm.tsx
- Component chính quản lý toàn bộ form đăng ký
- 4 bước (steps):
  - Step 1: Xác nhận thông tin gói đã chọn
  - Step 2: Thu thập thông tin liên hệ (họ tên, SĐT, email)
  - Step 3: Thu thập thông tin sinh (ngày/tháng/năm/giờ, giới tính)
  - Step 4: Thông tin bổ sung và xác nhận
- Validation cho từng bước
- Submit → Google Sheets → PayOS → Redirect

#### StepIndicator.tsx
- Progress indicator hiển thị bước hiện tại
- Visual với số bước và tên bước
- Responsive design

#### PackageInfoCard.tsx
- Hiển thị thông tin gói đã chọn
- Tên gói, giá, features

### 2. Pages

#### /register
- Trang đăng ký chính
- Nhận params: `packageId`, `packageName`, `price`
- Layout đẹp với gradient background
- Trust indicators (thanh toán an toàn, giao nhanh, bảo mật)

#### /payment-success
- Trang hiển thị sau khi thanh toán thành công
- Thông tin đơn hàng
- Hướng dẫn các bước tiếp theo
- Thông tin liên hệ support

#### /payment-cancel
- Trang hiển thị khi khách hàng hủy thanh toán
- Gợi ý hành động tiếp theo
- Link quay lại pricing hoặc thử lại

### 3. API Endpoints

#### /api/create-payment-link
- Astro API endpoint
- Nhận thông tin đơn hàng từ form
- Tạo payment link qua PayOS SDK
- Return checkout URL

## Luồng hoạt động

```
1. Khách hàng click "Chọn gói này" trong Pricing
   ↓
2. Redirect đến /register với params (packageId, packageName, price)
   ↓
3. Điền form 4 bước với validation
   ↓
4. Submit form:
   - Gọi Google Apps Script → Lưu vào Google Sheets
   - Gọi /api/create-payment-link → Tạo PayOS link
   ↓
5. Redirect đến PayOS checkout page
   ↓
6. Khách hàng thanh toán:
   - Thành công → /payment-success
   - Hủy/Fail → /payment-cancel
```

## Type Definitions

Location: `src/types/registration.ts`

- `RegistrationFormData`: Dữ liệu form đăng ký
- `GoogleSheetsData`: Dữ liệu gửi đến Google Sheets
- `PayOSCreatePaymentLinkRequest`: Request tạo payment link
- `FormStep`: Type cho bước form (1-4)
- Constants: `FORM_STEPS`, `GENDER_OPTIONS`, `BIRTH_HOUR_OPTIONS`, `MONTH_OPTIONS`

## Cấu hình

### Environment Variables

Cần thiết lập trong `.env`:

```env
# PayOS
PAYOS_CLIENT_ID=...
PAYOS_API_KEY=...
PAYOS_CHECKSUM_KEY=...

# Google Sheets
PUBLIC_GOOGLE_SHEETS_SCRIPT_URL=...

# Site URL (optional)
PUBLIC_SITE_URL=...
```

Xem chi tiết: [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)

### Google Apps Script

Xem hướng dẫn: [GOOGLE_APPS_SCRIPT.md](./GOOGLE_APPS_SCRIPT.md)

## UI/UX Features

### Form Validation
- Real-time validation cho từng field
- Error messages rõ ràng bằng toast notifications
- Validation trước khi chuyển step

### Responsive Design
- Mobile-first approach
- Adaptive layout cho mọi kích thước màn hình
- Touch-friendly buttons và inputs

### Animations
- Smooth transitions giữa các steps
- Fade-in animations cho content
- Loading states rõ ràng

### Accessibility
- Proper label associations
- Keyboard navigation support
- ARIA attributes
- Screen reader friendly

## shadcn/ui Components Used

- `Button`: Navigation và submit
- `Input`: Text fields
- `Label`: Form labels
- `Select`: Dropdowns (tháng, giờ sinh)
- `RadioGroup`: Gender selection
- `Card`: Content containers
- `Badge`: Status indicators
- `Toast`: Notifications
- `Dialog`: (có thể dùng cho confirmations)

## Testing Checklist

- [ ] Form validation hoạt động đúng
- [ ] Dữ liệu lưu vào Google Sheets thành công
- [ ] PayOS payment link được tạo đúng
- [ ] Redirect đến PayOS checkout
- [ ] Return về /payment-success khi thành công
- [ ] Return về /payment-cancel khi hủy
- [ ] Responsive trên mobile
- [ ] Toast notifications hiển thị đúng
- [ ] Google Analytics tracking hoạt động

## Troubleshooting

### Lỗi: "Payment system is not configured properly"
- Kiểm tra environment variables PayOS đã được set chưa
- Verify credentials từ PayOS dashboard

### Lỗi: "Failed to save data to Google Sheets"
- Kiểm tra `PUBLIC_GOOGLE_SHEETS_SCRIPT_URL` đã đúng chưa
- Verify Apps Script đã deploy với quyền "Anyone"
- Check Apps Script logs để debug

### Form không submit
- Mở DevTools Console để xem errors
- Kiểm tra network tab cho failed requests
- Verify validation rules

## Future Enhancements

- [ ] Email confirmation tự động sau khi thanh toán
- [ ] Webhook từ PayOS để update trạng thái real-time
- [ ] Save draft (lưu nháp form)
- [ ] Multiple payment methods
- [ ] Discount codes/Vouchers
- [ ] Order history cho khách hàng
- [ ] Admin dashboard để xem orders

## References

- [PayOS Documentation](https://payos.vn/docs/)
- [PayOS Node SDK](https://github.com/payOSHQ/payos-node)
- [shadcn/ui](https://ui.shadcn.com/)
- [Astro Documentation](https://docs.astro.build/)

