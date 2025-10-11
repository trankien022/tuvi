# 🚨 Quick Fix Guide - PayOS 500 Error

## ⚡ TL;DR - Làm ngay

```bash
# 1. Khởi động lại server
npm run dev

# 2. Test lại form đăng ký
# 3. Xem terminal logs để biết lỗi chính xác
```

---

## 🔍 Đã sửa gì?

✅ **Thêm site config** - PayOS giờ biết redirect về đâu  
✅ **Cải thiện error messages** - Bạn sẽ thấy lỗi chi tiết  
✅ **Thêm detailed logging** - Server logs giờ rất rõ ràng  
✅ **Multiple URL fallbacks** - Ít lỗi hơn về URLs  

---

## 📋 Checklist 3 bước

### 1️⃣ Kiểm tra `.env` file

Mở `.env` và verify:

```env
PAYOS_CLIENT_ID=937b7206-9762-4cfe-942a-c519e9d1d423
PAYOS_API_KEY=4d70034e-38bb-4b69-bc09-6bc099b521de
PAYOS_CHECKSUM_KEY=4bdf1925b71190e71da14a9e234c1ecc68c5dcd19e596fe312c151eed3fc5998
```

✓ Có đủ 3 dòng  
✓ Không có khoảng trắng thừa  
✓ Không có dấu ngoặc kép  

### 2️⃣ Test PayOS credentials

```bash
node scripts/test-payos.js
```

**Nếu PASS:**
```
✓ PayOS instance created successfully
✓ Payment link created
```
→ Credentials OK, chuyển bước 3

**Nếu FAIL:**
→ Sai credentials, lấy lại từ PayOS Dashboard

### 3️⃣ Test registration form

```bash
npm run dev
```

Mở browser → Fill form → Submit → **XEM TERMINAL LOGS**

---

## 🔎 Đọc error logs

### ✅ Nếu thành công:

**Terminal sẽ hiển thị:**
```
PayOS instance created successfully
URLs: { baseUrl: '...', returnUrl: '...', cancelUrl: '...' }
Creating PayOS payment link with data: { ... }
PayOS response: { checkoutUrl: 'https://pay.payos.vn/...' }
```

**Browser sẽ:**
- Chuyển đến trang PayOS
- Không có error trong console

### ❌ Nếu lỗi:

**Terminal sẽ hiển thị:**
```
PayOS API Error: ...
HTTP Response Error: {
  status: 400/401/500,
  data: { message: "..." }
}
```

**Browser console sẽ hiển thị:**
```
Payment API Error: { 
  status: ..., 
  message: "...", 
  details: "..." 
}
```

→ **Copy error message** và xem bên dưới

---

## 🆘 Quick fixes cho lỗi thường gặp

### Error: "Payment system is not configured properly"
```bash
# Kiểm tra .env
cat .env  # Mac/Linux
type .env # Windows

# Nếu thiếu → Copy từ .env.example hoặc tạo mới
```

### Error: "401 Unauthorized"
```
1. Vào https://my.payos.vn/
2. Settings → API Credentials
3. Copy lại 3 credentials
4. Paste vào .env
5. Khởi động lại server
```

### Error: "400 Bad Request - orderCode already exists"
```
→ Đợi 5 giây rồi submit lại
→ OrderCode tự động tạo từ timestamp, sẽ unique sau vài giây
```

### Error: "description: Mô tả tối đa 25 kí tự"
```
✅ ĐÃ SỬA - Description giờ là "TT don {orderCode}" (< 25 chars)
→ Nếu vẫn gặp, kiểm tra code đã update chưa
```

### Error: "ETIMEDOUT" hoặc "ECONNREFUSED"
```
1. Kiểm tra internet
2. Test: curl https://api-merchant.payos.vn/
3. Tắt VPN/firewall thử xem
```

---

## 📞 Cần help?

### Gửi thông tin này:

1. **Output của test script:**
   ```bash
   node scripts/test-payos.js
   ```

2. **Server logs khi submit form** (toàn bộ từ lúc click Submit)

3. **Browser console errors** (F12 → Console tab)

4. **Screenshot nếu có**

### Documents hữu ích:

- `docs/PAYOS_500_FIX_COMPLETE.md` - Chi tiết đầy đủ
- `docs/TROUBLESHOOTING_PAYOS_500.md` - Troubleshooting guide
- `docs/PAYOS_INTEGRATION.md` - PayOS integration guide
- `docs/ENVIRONMENT_SETUP.md` - Setup environment variables

---

## 🎯 Expected Result

Sau khi sửa xong, flow nên như này:

1. User điền form đăng ký
2. Click "Thanh toán"
3. Terminal logs:
   ```
   ✓ Received request body
   ✓ PayOS instance created
   ✓ Creating payment link
   ✓ PayOS response: { checkoutUrl: "..." }
   ```
4. Browser chuyển đến PayOS checkout page
5. User có thể thanh toán hoặc cancel

---

**Last updated:** Oct 11, 2025  
**Status:** ✅ Ready to test

