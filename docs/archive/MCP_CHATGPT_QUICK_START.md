# ⚡ MCP + ChatGPT Web - Quick Start (5 phút)

## 📌 Tóm tắt
Bạn vừa push code lên GitHub. Vercel sẽ **tự động deploy**. Sau đó bạn chỉ cần **kết nối với ChatGPT Web** là done!

---

## ✅ Step 1: Vercel Deployment (Tự động)

**Status:** ✅ **Đang diễn ra**

Khi bạn push code:
- ✓ GitHub nhận thông báo
- ✓ Vercel tự động build & deploy
- ✓ Bạn sẽ nhận URL trong ~1-2 phút

### Cách kiểm tra:
1. Vào https://vercel.com → Dashboard
2. Chọn project `trucnghi` (hoặc tên của bạn)
3. Xem **Deployments** tab
4. Chờ status: **✓ Ready**

### URL sẽ là gì?
```
https://trucnghi.vercel.app
```
(Thay `trucnghi` bằng tên project của bạn nếu khác)

---

## 🔗 Step 2: Kết nối ChatGPT Web (2 phút)

### 2.1 Bật Developer Mode

1. Vào **chatgpt.com**
2. Click **profile** (góc phải)
3. Chọn **Settings**
4. Tìm **Developer Mode** → Bật **ON**

### 2.2 Add MCP Connector

1. Tạo **New Chat**
2. Click **"+"** hoặc tìm **"Add sources"**
3. Chọn **"Add MCP Connector"** hoặc **"Connect Server"**
4. Điền:
   - **Server Name:** `Trúc Nghị MCP`
   - **URL:** `https://trucnghi.vercel.app/mcp`
   - **Type:** `HTTP` (nếu có chọn)

5. Click **"Connect"** hoặc **"Trust"**

✓ Done! Tools sẽ hiện trong chat!

---

## 🛠️ Step 3: Test Tools

### Hỏi ChatGPT:
```
"Cấu trúc dự án này như thế nào?"
```
→ ChatGPT sẽ gọi tool `get_project_structure` và hiển thị thông tin

### Các tool khác:
```
"Đọc file src/components/features/hero/Hero.astro"
"Tìm tất cả component React trong project"
"Liệt kê tất cả API endpoints"
"Kiểm tra status đơn hàng ORDER123"
```

---

## ⏱️ Mốc thời gian

| Bước | Thời gian | Status |
|------|----------|--------|
| 1️⃣ Push GitHub | Ngay lập tức | ✅ Done |
| 2️⃣ Vercel Deploy | 1-2 phút | ⏳ Chờ |
| 3️⃣ Add ChatGPT | 1 phút | ⏳ Sau |
| **Total** | **~5 phút** | |

---

## 🔗 Important Links

| Mục đích | Link |
|---------|------|
| Vercel Dashboard | https://vercel.com/dashboard |
| MCP Server | https://trucnghi.vercel.app |
| Check Health | https://trucnghi.vercel.app/health |
| List Tools | https://trucnghi.vercel.app/mcp/tools |
| Full Guide | `CHATGPT_MCP_SETUP.md` |

---

## 📝 Troubleshooting

### ❌ "Deploy failed"
→ Xem Vercel logs: https://vercel.com → Dashboard → Deployments

### ❌ "Server not found"
→ Chờ 2-3 phút deploy xong

### ❌ "MCP tools not showing in ChatGPT"
→ Refresh page, tạo chat mới, kiểm tra Developer Mode bật chưa

### ❌ "Tool gọi nhưng error"
→ Xem Vercel logs để debug

---

## ✨ Success Checklist

- [ ] Code push lên GitHub
- [ ] Vercel deploy xong (status: Ready)
- [ ] Test health: https://trucnghi.vercel.app/health → 200 OK
- [ ] Developer Mode bật trên ChatGPT
- [ ] Add MCP Connector lên ChatGPT
- [ ] Test tool đầu tiên

---

## 🎉 Bạn đã xong!

MCP server của bạn giờ chạy trên ChatGPT Web! 🚀

**Bạn có thể:**
- Hỏi ChatGPT về code của mình
- Tìm components, functions
- Kiểm tra API status
- Share với team (sharing URL)

Enjoy! 🎊
