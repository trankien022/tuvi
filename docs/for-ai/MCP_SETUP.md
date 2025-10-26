# MCP Server Setup Guide - Trúc Nghị Project

## 📋 Overview

MCP (Model Context Protocol) Server cho phép ChatGPT, Claude Desktop, hoặc các AI models khác kết nối với dự án Trúc Nghị của bạn. Server này cung cấp 9 công cụ mạnh mẽ để:

✅ Đọc và hiểu codebase  
✅ Tìm kiếm file và function  
✅ Xem payment status  
✅ Chỉnh sửa components  
✅ Quản lý registration  

---

## 🚀 Setup Instructions

### Option 1: Using Claude Desktop (Recommended)

1. **Tìm thư mục cấu hình Claude Desktop:**
   - **macOS:** `~/Library/Application Support/Claude/`
   - **Windows:** `%APPDATA%\Claude\`
   - **Linux:** `~/.config/Claude/`

2. **Sao chép file cấu hình:**
   ```bash
   # Tìm file claude_desktop_config.json hoặc tạo mới
   # Nếu có sẵn, hợp nhất nội dung từ claude-desktop-config.json
   ```

3. **Cập nhật cấu hình:**
   ```json
   {
     "mcpServers": {
       "trucnghi-project": {
         "command": "node",
         "args": ["D:\\trucnghi\\mcp-server.js"],
         "env": {
           "NODE_ENV": "production"
         }
       }
     }
   }
   ```

4. **Khởi động lại Claude Desktop**

### Option 2: ChatGPT Plugin Setup

1. **Chuẩn bị server:**
   ```bash
   cd D:\trucnghi
   npm install -g pm2  # Chạy server ở background
   pm2 start mcp-server.js --name "trucnghi-mcp"
   ```

2. **Cấu hình ChatGPT Custom GPT:**
   - Truy cập: https://chatgpt.com/gpts/editor
   - Thêm actions/integrations
   - URL: `http://localhost:3000` (hoặc port của bạn)

### Option 3: Direct Usage in Cursor AI

1. **Sử dụng trong Cursor IDE:**
   - Cursor đã tích hợp MCP support
   - MCP server sẽ tự động được phát hiện
   - Bạn có thể dùng trong Chat hoặc Composer

---

## 🛠️ Available Tools

### 1. **read_file**
Đọc nội dung file từ dự án

**Ví dụ:**
```
Tool: read_file
Input: {
  "filePath": "src/components/features/registration/RegistrationForm.tsx"
}
```

**Response:** Trả về nội dung file, số dòng, kích thước

---

### 2. **search_files**
Tìm kiếm file theo pattern hoặc tên

**Ví dụ:**
```
Tool: search_files
Input: {
  "pattern": "payment",
  "directory": "src/pages/api"
}
```

**Response:** Danh sách file matching, số lượng

---

### 3. **search_code**
Tìm kiếm code bằng keyword hoặc tên function

**Ví dụ:**
```
Tool: search_code
Input: {
  "keyword": "handlePaymentSuccess",
  "fileType": "tsx"
}
```

**Response:** Danh sách matching với file, dòng, content

---

### 4. **list_directory**
Liệt kê nội dung thư mục

**Ví dụ:**
```
Tool: list_directory
Input: {
  "dirPath": "src/components"
}
```

**Response:** Danh sách files/folders với type và size

---

### 5. **get_registration_data**
Lấy thông tin về hệ thống đăng ký

**Ví dụ:**
```
Tool: get_registration_data
Input: {}
```

**Response:**
```json
{
  "description": "Registration system with 4-step form and PayOS integration",
  "steps": [...],
  "formFields": {...},
  "integratedSystems": ["PayOS", "Google Sheets", "Webhook handler"],
  "apiEndpoints": [...]
}
```

---

### 6. **get_payment_status**
Lấy thông tin về thanh toán

**Ví dụ:**
```
Tool: get_payment_status
Input: {
  "orderCode": "ORDER123"
}
```

**Response:**
```json
{
  "hasCheckEndpoint": true,
  "location": "src/pages/api/check-payment-status.ts",
  "expectedResponse": {...}
}
```

---

### 7. **list_components**
Liệt kê tất cả components

**Ví dụ:**
```
Tool: list_components
Input: {
  "category": "features"
}
```

**Response:** Danh sách components theo category

**Categories:** `features`, `common`, `ui`, `icons`, `layouts`, `all`

---

### 8. **get_project_structure**
Lấy tổng quan về cấu trúc dự án

**Ví dụ:**
```
Tool: get_project_structure
Input: {}
```

**Response:**
```json
{
  "name": "Trúc Nghị Landing Page",
  "framework": "Astro 4.0 + React 18 + TypeScript",
  "directories": {...},
  "keyFeatures": [...],
  "mainPages": [...]
}
```

---

### 9. **get_api_endpoints**
Lấy danh sách tất cả API endpoints

**Ví dụ:**
```
Tool: get_api_endpoints
Input: {}
```

**Response:** Danh sách endpoints, paths, descriptions

---

## 💬 Usage Examples

### Ví dụ 1: ChatGPT/Claude hỏi về Registration Flow

**You:**
```
Explain the registration flow in the Trúc Nghị project
```

**Claude (sử dụng MCP):**
1. Gọi `get_registration_data()` → Lấy thông tin form
2. Gọi `get_api_endpoints()` → Lấy API routes
3. Gọi `read_file("src/components/features/registration/RegistrationForm.tsx")` → Đọc component
4. Trả lời chi tiết về quy trình

---

### Ví dụ 2: Tìm cách xử lý payment

**You:**
```
How do we handle payment success in this project?
```

**Claude (sử dụng MCP):**
1. Gọi `search_code("handlePaymentSuccess", "tsx")`
2. Gọi `get_payment_status()`
3. Gọi `read_file()` để xem implementation
4. Giải thích step-by-step

---

### Ví dụ 3: List components

**You:**
```
Show me all UI components in this project
```

**Claude:**
1. Gọi `list_components("ui")`
2. Gọi `list_components("features")`
3. Trả lại danh sách tổng hợp

---

## 🔒 Security Features

- ✅ **Directory Traversal Prevention:** Không thể truy cập file ngoài `PROJECT_ROOT`
- ✅ **File Validation:** Kiểm tra file tồn tại trước khi đọc
- ✅ **Error Handling:** Xử lý lỗi gracefully
- ✅ **Tool Allowlist:** Chỉ các tools được phép được kích hoạt

---

## 🐛 Troubleshooting

### Problem: Server không khởi động
```bash
# Kiểm tra Node.js version
node --version  # Phải là 20.x

# Test server
node mcp-server.js
```

### Problem: Claude Desktop không detect MCP
- Kiểm tra đường dẫn file cấu hình đúng
- Restart Claude Desktop hoàn toàn
- Kiểm tra file `mcp-server.js` có executable permissions

### Problem: Tool không tìm thấy file
- Kiểm tra đường dẫn relative từ PROJECT_ROOT
- Ví dụ: `src/components/Hero.astro` (không phải absolute path)

---

## 📝 Development

### Thêm tool mới:

1. Thêm definition vào `TOOLS` array:
```javascript
{
  name: 'my_new_tool',
  description: 'What this tool does',
  inputSchema: {
    type: 'object',
    properties: {
      param1: { type: 'string', description: 'Param description' }
    },
    required: ['param1']
  }
}
```

2. Thêm implementation vào `toolImplementations`:
```javascript
my_new_tool: ({ param1 }) => {
  // Implementation
  return { result: 'data' };
}
```

3. Test:
```bash
node mcp-server.js
```

---

## 🔗 Integration with ChatGPT

### Sử dụng với ChatGPT Custom GPT:

1. **Tạo Custom GPT:** https://chatgpt.com/gpts/editor
2. **Thêm Tool/Action:**
   - **Schema URL:** `http://localhost:3000/schema.json`
   - **Method:** GET/POST
   - **Authentication:** None (hoặc API Key)

3. **Instructions cho GPT:**
   ```
   You have access to the Trúc Nghị project MCP server.
   Use the available tools to:
   - read_file: Đọc file từ dự án
   - search_files: Tìm file
   - search_code: Tìm code
   - list_directory: Liệt kê thư mục
   - get_registration_data: Lấy info đăng ký
   - get_payment_status: Kiểm tra thanh toán
   - list_components: Liệt kê components
   - get_project_structure: Lấy cấu trúc
   - get_api_endpoints: Lấy API endpoints
   
   Always use these tools when answering questions about the Trúc Nghị project.
   ```

---

## 📞 Support

Có vấn đề? Kiểm tra:
- `mcp-server.js` - Main server code
- `claude-desktop-config.json` - Configuration
- Project documentation

---

**Last Updated:** October 2025  
**MCP Version:** 2024-11-05  
**Project:** Trúc Nghị Landing Page
