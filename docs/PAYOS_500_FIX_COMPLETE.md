# PayOS 500 Error - Hoàn thành sửa lỗi

## Tóm tắt lỗi

**Lỗi gốc:**
```
Failed to load resource: the server responded with a status of 500 (Internal Server Error)
Submit error: Error: Lỗi khi tạo link thanh toán
    at handleSubmit (RegistrationForm.tsx:249:15)
```

**Nguyên nhân:** Nhiều vấn đề tiềm ẩn cần được khắc phục để hiển thị lỗi chi tiết và sửa lỗi.

---

## Các thay đổi đã thực hiện

### 1. ✅ Thêm cấu hình `site` trong Astro (astro.config.ts)

**Vấn đề:** API endpoint cần base URL để tạo returnUrl và cancelUrl cho PayOS, nhưng `site` không được cấu hình.

**Sửa:**
```typescript
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://trucnghi.vercel.app',
  // ...
});
```

**Lợi ích:** PayOS giờ đây có thể redirect người dùng về đúng URL sau khi thanh toán.

---

### 2. ✅ Cải thiện phát hiện URL (create-payment-link.ts)

**Vấn đề:** Chỉ dựa vào một nguồn duy nhất cho base URL.

**Sửa:**
```typescript
// Thử nhiều nguồn
const siteUrl = site?.toString()?.replace(/\/$/, '');
const envUrl = import.meta.env.PUBLIC_SITE_URL;
const baseUrl = siteUrl || envUrl || 'https://trucnghi.vercel.app';
```

**Lợi ích:** Có fallback nếu một nguồn không khả dụng.

---

### 3. ✅ Thêm logging chi tiết (create-payment-link.ts)

**Vấn đề:** Lỗi chung chung, không biết nguyên nhân cụ thể.

**Sửa:**
- Log PayOS credentials (đã che giấu)
- Log URLs được tạo
- Log request data gửi đến PayOS
- Log response từ PayOS
- Log chi tiết lỗi HTTP (status, data, headers)
- Log lỗi axios-style (request/response)

**Lợi ích:** Có thể debug chính xác vấn đề từ server logs.

---

### 4. ✅ Cải thiện error handling trong RegistrationForm (RegistrationForm.tsx)

**Vấn đề:** Error message chung chung "Lỗi khi tạo link thanh toán" không giúp user hiểu vấn đề.

**Trước:**
```typescript
if (!paymentResponse.ok) {
  throw new Error('Lỗi khi tạo link thanh toán');
}
```

**Sau:**
```typescript
// Parse response trước
const paymentResult = await paymentResponse.json();

// Check status và lấy error message từ server
if (!paymentResponse.ok) {
  const errorMessage = paymentResult.message || paymentResult.error || 'Lỗi khi tạo link thanh toán';
  const errorDetails = paymentResult.details || '';
  console.error('Payment API Error:', {
    status: paymentResponse.status,
    statusText: paymentResponse.statusText,
    message: errorMessage,
    details: errorDetails,
    fullResponse: paymentResult,
  });
  throw new Error(`${errorMessage}${errorDetails ? '\n\nChi tiết: ' + errorDetails : ''}`);
}
```

**Lợi ích:** 
- Hiển thị error message cụ thể từ server
- Log đầy đủ vào console để debug
- User thấy lỗi chi tiết hơn

---

### 5. ✅ Cập nhật TypeScript types (registration.ts)

**Vấn đề:** Type `PayOSCreatePaymentLinkResponse` thiếu các field cần thiết.

**Sửa:**
```typescript
export interface PayOSCreatePaymentLinkResponse {
  success: boolean;
  checkoutUrl?: string;
  message?: string;
  error?: string;
  details?: string;      // ← Thêm mới
  orderCode?: number;    // ← Thêm mới
}
```

**Lợi ích:** TypeScript không báo lỗi khi access các field này.

---

## Cách test

### Bước 1: Khởi động lại server

```bash
# Dừng server hiện tại (Ctrl+C nếu đang chạy)
npm run dev
```

### Bước 2: Test registration form

1. Mở trình duyệt tại `http://localhost:4321`
2. Vào trang đăng ký
3. Điền form đầy đủ
4. Submit form

### Bước 3: Kiểm tra logs

**A. Terminal/Server logs (QUAN TRỌNG):**

Tìm các dòng này:
```
✓ Good:
  - "Received request body:"
  - "PayOS Credentials check:"
  - "PayOS instance created successfully"
  - "URLs:"
  - "Creating PayOS payment link with data:"
  - "PayOS response:"

✗ Nếu có lỗi:
  - "PayOS API Error:"
  - "HTTP Response Error:"
  - Chi tiết về status code và error message
```

**B. Browser Console (F12 → Console):**

Tìm:
```
✓ Good:
  - Không có lỗi
  - Redirect đến PayOS checkout

✗ Nếu có lỗi:
  - "Payment API Error:" với chi tiết
  - "Submit error:"
```

---

## Các lỗi thường gặp và cách khắc phục

### Lỗi 1: "Payment system is not configured properly"

**Nguyên nhân:** Thiếu PayOS credentials trong `.env`

**Khắc phục:**
1. Kiểm tra file `.env` có tồn tại
2. Verify có đủ 3 biến:
   ```env
   PAYOS_CLIENT_ID=...
   PAYOS_API_KEY=...
   PAYOS_CHECKSUM_KEY=...
   ```
3. Khởi động lại server

### Lỗi 2: HTTP 401 Unauthorized

**Nguyên nhân:** Sai thông tin xác thực PayOS

**Khắc phục:**
1. Đăng nhập [PayOS Dashboard](https://my.payos.vn/)
2. Vào Settings → API Credentials
3. Copy lại credentials chính xác
4. Cập nhật `.env`
5. Test bằng: `node scripts/test-payos.js`

### Lỗi 3: HTTP 400 Bad Request

**Nguyên nhân:** Dữ liệu gửi đến PayOS không hợp lệ

**Các trường hợp:**
- `orderCode` đã tồn tại → Đợi vài giây rồi thử lại
- `amount` không hợp lệ → Kiểm tra giá package
- Thiếu required fields → Kiểm tra request body trong logs
- **`description` quá dài** → PayOS giới hạn **tối đa 25 ký tự** ✅ ĐÃ SỬA

**Khắc phục:**
1. Xem server logs tại dòng "Creating PayOS payment link with data:"
2. So sánh với format đúng:
   ```json
   {
     "orderCode": 123456789,
     "amount": 299000,
     "description": "Thanh toán ...",
     "returnUrl": "https://...",
     "cancelUrl": "https://...",
     "items": [...]
   }
   ```
3. Kiểm tra data type (number vs string)

### Lỗi 4: Timeout hoặc Network Error

**Nguyên nhân:** Không kết nối được PayOS API

**Khắc phục:**
1. Kiểm tra internet
2. Test kết nối: `curl https://api-merchant.payos.vn/`
3. Kiểm tra firewall/antivirus
4. Thử trên mạng khác

---

## Checklist debug

Khi gặp lỗi, hãy check:

- [ ] Server đã khởi động lại sau khi sửa code
- [ ] File `.env` có đầy đủ credentials
- [ ] `node scripts/test-payos.js` chạy thành công
- [ ] Server logs hiển thị "PayOS instance created successfully"
- [ ] Request body có đầy đủ fields và đúng type
- [ ] URLs (returnUrl, cancelUrl) có format đúng
- [ ] Internet connection ổn định
- [ ] Browser console không có CORS errors

---

## Cách đọc error message mới

Sau khi sửa, error message sẽ chi tiết hơn:

### Ví dụ 1: Missing credentials
```
Error: Payment system is not configured properly. 
Please check PAYOS credentials in .env file.
```
→ Kiểm tra `.env`

### Ví dụ 2: Invalid orderCode
```
Error: Order code already exists

Chi tiết: {"code": "ORDER_EXISTS", "message": "..."}
```
→ Đợi vài giây hoặc test với orderCode khác

### Ví dụ 3: Invalid amount
```
Error: Amount must be greater than 0

Chi tiết: {"field": "amount", "received": 0}
```
→ Kiểm tra giá package

### Ví dụ 4: Network error
```
Error: connect ETIMEDOUT

Chi tiết: Could not reach PayOS API
```
→ Kiểm tra kết nối internet

---

## Test script

Luôn test PayOS credentials trước:

```bash
node scripts/test-payos.js
```

**Kết quả mong đợi:**
```
=== Testing PayOS API ===

1. Checking credentials:
   CLIENT_ID: 937b7206...
   API_KEY: 4d70034e...
   CHECKSUM_KEY: 4bdf1925b71190e7...

2. Creating PayOS instance...
   ✓ PayOS instance created successfully

3. Inspecting PayOS instance...
   Instance keys: [...]
   paymentRequests methods: [ 'constructor', 'create', 'get', 'cancel' ]

4. Creating test payment link...
   ✓ SUCCESS! Payment link created:
   Order Code: 123456
   Checkout URL: https://pay.payos.vn/web/...
```

Nếu script này chạy OK → PayOS credentials đúng, vấn đề là ở web app.

---

## Next Steps

### Bước tiếp theo sau khi sửa:

1. **Khởi động lại dev server:**
   ```bash
   npm run dev
   ```

2. **Test registration flow:**
   - Điền form
   - Submit
   - Xem logs

3. **Nếu vẫn lỗi:**
   - Copy **TOÀN BỘ** server logs từ lúc submit
   - Copy browser console error
   - Tìm dòng "Payment API Error:" hoặc "HTTP Response Error:"
   - Cung cấp logs để debug tiếp

4. **Nếu thành công:**
   - Bạn sẽ thấy "PayOS response:" với checkoutUrl
   - Browser sẽ redirect đến trang thanh toán PayOS
   - Test thanh toán thật (hoặc cancel để test cancel flow)

---

## Files đã thay đổi

1. ✅ `astro.config.ts` - Thêm site config
2. ✅ `src/pages/api/create-payment-link.ts` - Cải thiện error handling & logging
3. ✅ `src/components/features/registration/RegistrationForm.tsx` - Parse error details
4. ✅ `src/types/registration.ts` - Thêm fields vào response type
5. 📄 `docs/TROUBLESHOOTING_PAYOS_500.md` - Hướng dẫn troubleshooting
6. 📄 `docs/PAYOS_500_FIX_COMPLETE.md` - Document này

---

## Summary

### Vấn đề gốc:
- Generic 500 error, không rõ nguyên nhân
- Thiếu site configuration
- Error message không chi tiết
- Khó debug

### Giải pháp:
- ✅ Thêm site configuration với fallbacks
- ✅ Cải thiện error handling ở cả client và server
- ✅ Thêm comprehensive logging
- ✅ Parse và hiển thị error message chi tiết từ PayOS
- ✅ Cập nhật TypeScript types
- ✅ Tạo troubleshooting guide

### Kết quả:
- Error message giờ rất chi tiết
- Dễ debug qua server logs
- User biết chính xác lỗi gì
- Developer có đủ thông tin để fix

---

**Ngày cập nhật:** 11 tháng 10, 2025  
**Trạng thái:** ✅ Hoàn thành - Chờ test  
**Tác giả:** AI Assistant

