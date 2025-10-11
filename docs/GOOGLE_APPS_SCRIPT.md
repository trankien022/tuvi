/*************************************************
 * Google Apps Script - Form intake + Payment update
 * Author: Ken's helper
 * Sheet columns (A→O):
 * A Timestamp | B Họ tên | C SĐT | D Email | E Ngày sinh | F Tháng sinh | G Năm sinh
 * H Giờ sinh | I Giới tính | J Địa chỉ | K Câu hỏi đặc biệt | L Gói đã chọn
 * M Giá (VND) | N Trạng thái thanh toán | O Order Code
 **************************************************/

const SHEET_NAME = 'Sheet1'; // Đổi nếu cần
const HEADERS = [
  'Timestamp', 'Họ tên', 'Số điện thoại', 'Email',
  'Ngày sinh', 'Tháng sinh', 'Năm sinh', 'Giờ sinh',
  'Giới tính', 'Địa chỉ', 'Câu hỏi đặc biệt',
  'Gói đã chọn', 'Giá (VND)', 'Trạng thái thanh toán', 'Order Code'
];

// Các chỉ số cột (0-based) để tránh nhầm
const COL = {
  TIMESTAMP: 0,
  FULL_NAME: 1,
  PHONE: 2,
  EMAIL: 3,
  BIRTH_DAY: 4,
  BIRTH_MONTH: 5,
  BIRTH_YEAR: 6,
  BIRTH_HOUR: 7,
  GENDER: 8,
  ADDRESS: 9,
  SPECIAL_Q: 10,
  PACKAGE: 11,
  PRICE: 12,
  PAY_STATUS: 13, // N
  ORDER_CODE: 14  // O
};

/** Lấy sheet và đảm bảo header đúng chuẩn */
function getSheetEnsured() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
  if (sheet.getName() !== SHEET_NAME) {
    // Nếu đang dùng sheet khác, cố gắng tìm/đổi tên hợp lý
    const maybe = ss.getSheetByName(SHEET_NAME);
    sheet = maybe || sheet;
    if (!maybe && sheet.getName() !== SHEET_NAME) {
      sheet.setName(SHEET_NAME);
    }
  }
  ensureHeaders(sheet);
  return sheet;
}

/** Tạo/đồng bộ hàng tiêu đề (hàng 1) theo HEADERS */
function ensureHeaders(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const current = range.getValues()[0];
  const needRewrite =
    current.length !== HEADERS.length ||
    HEADERS.some((h, i) => (current[i] || '').toString().trim() !== h);

  if (needRewrite) {
    range.setValues([HEADERS]);
    // Thêm một chút định dạng cho dễ nhìn (không bắt buộc)
    range.setFontWeight('bold').setBackground('#f5f5f5');
    sheet.setFrozenRows(1);
  }
}

/** Chuẩn hóa chuỗi */
function s(x) {
  return (x == null ? '' : String(x)).trim();
}

/** API: kiểm tra hoạt động + schema */
function doGet(e) {
  const sheet = getSheetEnsured();
  const payload = {
    status: 'ok',
    message: 'Use POST with JSON body to submit data.',
    sheet: sheet.getName(),
    headers: HEADERS
  };
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/** API: nhận dữ liệu đăng ký từ website (JSON) */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResult(false, 'Empty body');
    }

    const data = JSON.parse(e.postData.contents);

    // Validate các trường bắt buộc
    if (!s(data.fullName) || !s(data.phone) || !s(data.email)) {
      return jsonResult(false, 'Missing required fields: fullName, phone, email');
    }

    const sheet = getSheetEnsured();
    const timestamp = new Date();

    // Ghi một hàng mới theo đúng thứ tự cột A→O
    const row = [
      timestamp,                  // A Timestamp
      s(data.fullName),           // B Họ tên
      s(data.phone),              // C Số điện thoại
      s(data.email),              // D Email
      s(data.birthDay),           // E Ngày sinh
      s(data.birthMonth),         // F Tháng sinh
      s(data.birthYear),          // G Năm sinh
      s(data.birthHour),          // H Giờ sinh
      s(data.gender),             // I Giới tính
      s(data.address),            // J Địa chỉ
      s(data.specialQuestion),    // K Câu hỏi đặc biệt
      s(data.packageName),        // L Gói đã chọn
      s(data.price),              // M Giá (VND)
      'Chờ thanh toán',           // N Trạng thái thanh toán (default)
      s(data.orderCode)           // O Order Code
    ];

    sheet.appendRow(row);

    return jsonResult(true, 'Data saved successfully', {
      timestamp: timestamp.toISOString(),
      orderCode: s(data.orderCode)
    });

  } catch (err) {
    return jsonResult(false, err && err.toString ? err.toString() : 'Unknown error');
  }
}

/** JSON helper */
function jsonResult(success, message, extra) {
  const body = Object.assign({ success, message }, extra || {});
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Cập nhật trạng thái thanh toán theo orderCode
 * Dùng cho webhook từ PayOS (hoặc chạy thủ công).
 * Ví dụ: updatePaymentStatus('ORDER123', 'PAID')
 */
function updatePaymentStatus(orderCode, status) {
  const code = s(orderCode);
  const stt = s(status) || 'PAID';
  if (!code) return false;

  const sheet = getSheetEnsured();
  const values = sheet.getDataRange().getValues(); // gồm cả header
  // Duyệt từ dòng 2 (i = 1) để bỏ qua header
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (s(row[COL.ORDER_CODE]) === code) {
      // Cập nhật cột N (PAY_STATUS) ở hàng i+1, cột 14 (1-based)
      sheet.getRange(i + 1, COL.PAY_STATUS + 1).setValue(stt);
      return true;
    }
  }
  return false;
}

/**
 * Hàm tiện ích: tìm dòng theo orderCode (trả về chỉ số hàng 1-based, hoặc -1 nếu không có)
 */
function findRowByOrderCode(orderCode) {
  const code = s(orderCode);
  const sheet = getSheetEnsured();
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (s(values[i][COL.ORDER_CODE]) === code) {
      return i + 1; // 1-based
    }
  }
  return -1;
}
