# 🚀 MCP Server + ChatGPT Web - Complete Setup Guide

## 📋 Tổng quan

Bạn sẽ:
1. **Deploy MCP server** lên Vercel (chứa 9 tools)
2. **Kết nối ChatGPT Web** với server đó
3. **Test tools** trên ChatGPT

---

## ✅ Step 1: Deploy MCP Server lên Vercel (5 phút)

### Yêu cầu:
- GitHub account (free)
- Vercel account (free, link với GitHub)
- Project repository (bạn đã có)

### Các bước:

#### 1.1 Push code lên GitHub
```bash
cd D:\trucnghi
git add .
git commit -m "Add MCP server for ChatGPT deployment"
git push origin main
```

#### 1.2 Deploy lên Vercel

**Option A: Vercel CLI (nhanh nhất)**
```bash
npm install -g vercel
vercel login
vercel deploy --prod
```

**Option B: Vercel Web UI**
1. Vào https://vercel.com
2. Click "Add New..." → "Project"
3. Import repository `trucnghi`
4. Click "Deploy"
5. Chờ ~30 giây

### Kết quả:
Bạn sẽ nhận được URL dạng:
```
https://trucnghi.vercel.app
```

### Test MCP Server đã deploy:
```bash
# Health check
curl https://trucnghi.vercel.app/mcp/tools

# Gọi tool thử
curl -X POST https://trucnghi.vercel.app/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{"name": "get_project_structure", "arguments": {}}'
```

---

## 🔗 Step 2: Kết nối ChatGPT Web với MCP Server

### 2.1 Bật Developer Mode trên ChatGPT Web

1. Vào **chatgpt.com** (đảm bảo đã login)
2. Click **profile picture** (góc trên phải) → **Settings**
3. Tìm **Developer Mode** hoặc **Advanced**
4. Bật toggle "**Enable Developer Mode**"

### 2.2 Thêm MCP Connector

1. Tạo một **New Chat**
2. Click biểu tượng **"+"** hoặc tìm **"Add sources"**
3. Chọn **"Add MCP Connector"** hoặc **"Connect Server"**
4. Nhập thông tin:

| Field | Giá trị |
|-------|--------|
| **Server Name** | `Trúc Nghị MCP` |
| **Server URL** | `https://trucnghi.vercel.app/mcp` |
| **Type** | `HTTP` |
| **Description** | `MCP tools for Trúc Nghị project` |

5. Click **"Trust this application"** ✓
6. Click **"Connect"**

### 2.3 Authorize Connector

Khi kết nối lần đầu:
- ChatGPT sẽ gửi request test
- Bạn sẽ thấy notification "Connected" ✓
- MCP tools hiện trong chat

---

## 🛠️ Step 3: Test MCP Tools trên ChatGPT

### Có 9 tools sẵn sàng:

#### 1. **read_file** - Đọc nội dung file
```
"Đọc nội dung file src/components/features/hero/Hero.astro"
```

#### 2. **search_files** - Tìm file
```
"Tìm tất cả file liên quan đến payment trong thư mục src/pages/api"
```

#### 3. **search_code** - Tìm code
```
"Tìm tất cả nơi sử dụng RegistrationForm trong project"
```

#### 4. **list_directory** - Liệt kê thư mục
```
"Hiển thị cấu trúc của thư mục src/components"
```

#### 5. **list_components** - Liệt kê components
```
"Liệt kê tất cả React components trong category features"
```

#### 6. **get_registration_data** - Info form đăng ký
```
"Lấy thông tin về form đăng ký"
```

#### 7. **get_payment_status** - Trạng thái thanh toán
```
"Kiểm tra trạng thái thanh toán cho order ORDER123"
```

#### 8. **get_project_structure** - Tổng quan dự án
```
"Cho tôi xem cấu trúc tổng quan của dự án"
```

#### 9. **get_api_endpoints** - Liệt kê API
```
"Liệt kê tất cả API endpoints"
```

---

## 📊 Example Conversations

### Example 1: Hiểu cấu trúc project
```
User: Dự án này là gì? Nó được xây dựng với công nghệ nào?

ChatGPT (với MCP):
- Gọi tool: get_project_structure
- Hiển thị: Framework, components, API endpoints...
- Giải thích: Astro + React + TypeScript
```

### Example 2: Tìm code cụ thể
```
User: Hàm xử lý thanh toán nằm ở đâu?

ChatGPT (với MCP):
- Gọi tool: search_code with keyword="handlePayment"
- Tìm file: src/pages/api/create-payment-link.ts
- Hiển thị: Code + giải thích
```

### Example 3: Đọc component
```
User: Cho tôi xem Hero component nhé

ChatGPT (với MCP):
- Gọi tool: read_file with filePath="src/components/features/hero/Hero.astro"
- Hiển thị: Full code + phân tích
```

---

## 🔒 Security (Optional)

Nếu muốn bảo mật MCP server:

### Option 1: API Key (đơn giản)
```javascript
// Thêm vào api/mcp.js
const API_KEY = process.env.MCP_API_KEY;

export default async (req, res) => {
  const key = req.headers['x-api-key'];
  if (key !== API_KEY) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  // ... MCP handler
};
```

### Option 2: CORS restricted
```javascript
// Chỉ cho ChatGPT domain
res.setHeader('Access-Control-Allow-Origin', 'https://chatgpt.com');
```

---

## 📱 Test từ các nơi

### Browser
```
https://trucnghi.vercel.app/
- Xem dashboard
- Xem danh sách tools
```

### cURL (command line)
```bash
curl https://trucnghi.vercel.app/mcp/tools

curl -X POST https://trucnghi.vercel.app/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{"name": "get_project_structure", "arguments": {}}'
```

### ChatGPT Web
```
- Thêm connector như Step 2
- Dùng tools trong chat
```

---

## 🐛 Troubleshooting

### ❌ "Server not responding"
- ✅ Test: https://trucnghi.vercel.app/health
- ✅ Nếu 404: Vercel deployment chưa xong
- ✅ Chờ 30 giây, thử lại

### ❌ "MCP tools not appearing in ChatGPT"
- ✅ Check: Developer Mode bật chưa?
- ✅ Check: URL đúng chưa? `https://trucnghi.vercel.app/mcp`
- ✅ Try: Refresh page, tạo chat mới

### ❌ "Tool gọi nhưng không ra kết quả"
- ✅ Kiểm tra: Tool name đúng chưa?
- ✅ Kiểm tra: Arguments đúng format chưa?
- ✅ Check logs: `vercel logs` (Vercel dashboard)

---

## 🚀 Next Steps

### Thêm tools mới (optional)
Edit `mcp-server.js` → add TOOLS + implementations → commit → Vercel auto-redeploy

### Backup & Share
```bash
# Save URL
MCP_URL=https://trucnghi.vercel.app/mcp
echo $MCP_URL
```

---

## 📞 Quick Reference

| Thao tác | Link/Command |
|---------|-------------|
| **Live Server** | https://trucnghi.vercel.app |
| **Health Check** | https://trucnghi.vercel.app/health |
| **Tools List** | https://trucnghi.vercel.app/mcp/tools |
| **Deploy lại** | `git push origin main` → Vercel auto-deploy |
| **View Logs** | Vercel Dashboard → Deployments |

---

## ✨ Success!

🎉 MCP server của bạn đã chạy trên ChatGPT Web!

**Bạn có thể:**
- ✅ Nhìn code qua ChatGPT
- ✅ Tìm functions
- ✅ Kiểm tra API status
- ✅ Share với team

**Enjoy!** 🚀
