# Tính năng Kiểm tra Trạng thái Thanh toán

## Tổng quan

Tính năng này cho phép kiểm tra trạng thái thanh toán thực tế từ PayOS và cập nhật vào Google Sheets, đảm bảo tính chính xác và đồng bộ dữ liệu.

## Các API Endpoints mới

### 1. Kiểm tra trạng thái thanh toán
- **Endpoint**: `POST /api/check-payment-status`
- **Mục đích**: Kiểm tra trạng thái thanh toán từ PayOS
- **Request Body**:
  ```json
  {
    "orderCode": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "orderCode": "123456",
    "status": "paid",
    "isPaid": true,
    "paymentInfo": {
      "status": "PAID",
      "amount": 599000,
      "description": "Tử Vi Trọn Đời",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

### 2. Cập nhật trạng thái thanh toán vào Google Sheets
- **Endpoint**: `POST /api/update-payment-status`
- **Mục đích**: Cập nhật trạng thái thanh toán vào Google Sheets
- **Request Body**:
  ```json
  {
    "orderCode": "123456",
    "paymentStatus": "paid",
    "paymentInfo": {
      "amount": 599000,
      "description": "Tử Vi Trọn Đời"
    },
    "registrationData": {
      "fullName": "Nguyễn Văn A",
      "email": "test@example.com"
    }
  }
  ```

### 3. Webhook PayOS
- **Endpoint**: `POST /api/payos-webhook`
- **Mục đích**: Nhận thông báo từ PayOS khi trạng thái thanh toán thay đổi
- **Request Body** (từ PayOS):
  ```json
  {
    "type": "payment.status.changed",
    "data": {
      "orderCode": "123456",
      "status": "PAID",
      "amount": 599000,
      "description": "Tử Vi Trọn Đời"
    }
  }
  ```

## Cập nhật Trang Payment Success

Trang `/payment-success` đã được cập nhật để:

1. **Kiểm tra trạng thái thực tế**: Tự động gọi API để kiểm tra trạng thái thanh toán từ PayOS
2. **Hiển thị trạng thái chính xác**: Hiển thị trạng thái thanh toán thực tế (thành công, hủy, hết hạn, đang chờ)
3. **UI động**: Thay đổi giao diện dựa trên trạng thái thanh toán
4. **Thông tin chi tiết**: Hiển thị thông tin thanh toán chi tiết khi có

### Các trạng thái được hỗ trợ:
- ✅ **Paid**: Thanh toán thành công
- ❌ **Cancelled**: Thanh toán đã hủy
- ⏰ **Expired**: Thanh toán đã hết hạn
- ⏳ **Pending**: Đang chờ xác nhận

## Scripts Test

### 1. Test kiểm tra trạng thái thanh toán
```bash
node scripts/test-payment-status.js [orderCode]
```

### 2. Test webhook PayOS
```bash
node scripts/test-payos-webhook.js [orderCode] [status]
```

Ví dụ:
```bash
# Test với order code 123456 và trạng thái PAID
node scripts/test-payos-webhook.js 123456 PAID
```

## Cấu hình Google Sheets

Để tính năng hoạt động, cần cấu hình Google Sheets Script để xử lý action `updatePaymentStatus`:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'updatePaymentStatus') {
      // Xử lý cập nhật trạng thái thanh toán
      const sheet = SpreadsheetApp.getActiveSheet();
      // Logic cập nhật vào sheet
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Payment status updated successfully'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Xử lý các action khác...
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Cấu hình PayOS Webhook

1. Đăng nhập vào PayOS Dashboard
2. Vào phần Webhook Settings
3. Thêm webhook URL: `https://yourdomain.com/api/payos-webhook`
4. Chọn events: `payment.status.changed`
5. Lưu cấu hình

## Lợi ích

1. **Tính chính xác**: Kiểm tra trạng thái thanh toán thực tế từ PayOS
2. **Đồng bộ dữ liệu**: Tự động cập nhật trạng thái vào Google Sheets
3. **Trải nghiệm người dùng**: Hiển thị trạng thái chính xác cho khách hàng
4. **Tự động hóa**: Webhook tự động cập nhật khi có thay đổi
5. **Xử lý lỗi**: Có fallback khi API không khả dụng

## Lưu ý

- Cần cấu hình đúng PayOS credentials trong `.env`
- Cần cấu hình Google Sheets Script URL
- Webhook cần được cấu hình trong PayOS Dashboard
- API có error handling và fallback mechanisms
