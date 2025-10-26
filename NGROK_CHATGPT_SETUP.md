# 🚀 Ngrok + ChatGPT MCP Setup Guide

## ✅ Status: Auth Token Added

Your ngrok auth token has been configured successfully!

---

## 📋 Quick Start (3 Steps)

### **Step 1: Make sure MCP server is running**
```bash
npm run mcp:http
# ✓ Server runs on http://localhost:3000
```

### **Step 2: Start ngrok tunnel (in NEW terminal)**
```bash
npm run mcp:tunnel
# or: ngrok http 3000
```

Expected output:
```
Session Status                online
Version                       3.x.x
Region                        ap
Forwarding                    https://YOUR-URL.ngrok.io -> http://localhost:3000
Web Interface                 http://127.0.0.1:4040
```

**Copy the forwarding URL!** (e.g., `https://YOUR-URL.ngrok.io`)

### **Step 3: Configure ChatGPT Custom GPT**

1. Go to: https://chatgpt.com/gpts/editor
2. Click "Create new GPT" or edit existing
3. Find "**Configure**" section
4. Look for "**Actions**" or "**Tools**"
5. Add new action:
   - **Schema URL/Endpoint:** `https://YOUR-URL.ngrok.io/mcp`
   - **Type:** REST API
   - **Authentication:** None (for now)

6. Save and test!

---

## 🧪 Test Connection

### **Test 1: Health Check**
```bash
curl https://YOUR-URL.ngrok.io/health
# Should return: {"status":"healthy",...}
```

### **Test 2: List Tools**
```bash
curl https://YOUR-URL.ngrok.io/mcp/tools
# Should return: array of 9 tools
```

### **Test 3: Call Tool**
```bash
curl -X POST https://YOUR-URL.ngrok.io/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{"name":"get_project_structure","arguments":{}}'
# Should return: project structure data
```

---

## 🔧 Setup Process

### Terminal 1: Start MCP Server
```bash
cd D:\trucnghi
npm run mcp:http
# ✓ Listening on http://localhost:3000
```

### Terminal 2: Start Ngrok (NEW)
```bash
cd D:\trucnghi
npm run mcp:tunnel
# ✓ Forwards to https://YOUR-URL.ngrok.io
```

### Terminal 3 (Optional): Test
```bash
curl https://YOUR-URL.ngrok.io/health
curl https://YOUR-URL.ngrok.io/mcp/tools
```

---

## 📝 ChatGPT Custom GPT Instructions

Once you configure the action, add these instructions to your Custom GPT:

```
You have access to the Trúc Nghị Project MCP Server.

Available tools:
1. read_file - Read file contents
2. search_files - Search files by pattern
3. search_code - Search code by keyword
4. list_directory - List directory contents
5. list_components - List React components
6. get_registration_data - Get registration system info
7. get_payment_status - Get payment integration info
8. get_project_structure - Get project overview
9. get_api_endpoints - Get API endpoints list

Always use these tools when answering questions about the Trúc Nghị project.

Examples:
- "Explain the payment flow" → use get_payment_status + read_file
- "Show me components" → use list_components
- "What's the project structure?" → use get_project_structure
- "Find the registration code" → use search_code("registration")
```

---

## 🔐 Security Notes

⚠️ **Important for Production:**
- Add authentication (API Key)
- Use HTTPS everywhere
- Limit CORS origins
- Add rate limiting
- Validate all inputs

For now (dev), it's okay to have no auth.

---

## 🆘 Troubleshooting

### Problem: "ngrok: command not found"
```bash
# Solution: Reinstall
npm install -g ngrok
# Then: ngrok config add-authtoken YOUR_TOKEN
```

### Problem: "Address already in use"
```bash
# Solution: Port 3000 is busy
# Find and kill the process:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problem: Ngrok URL keeps changing
```bash
# Solution: Use ngrok agent with reserved domain (paid feature)
# For now, just update ChatGPT URL when it changes
```

### Problem: ChatGPT says "Unsafe URL"
```
✓ Make sure you're using HTTPS (ngrok provides this)
✓ URL should start with https://
✓ Not http://localhost
```

---

## 📚 Useful Commands

```bash
# Start MCP server
npm run mcp:http

# Start ngrok tunnel
npm run mcp:tunnel

# Test MCP tools
npm run mcp:test

# Test individual tool
curl -X POST http://localhost:3000/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{"name":"get_project_structure","arguments":{}}'
```

---

## 🎯 Next Steps

1. ✅ Auth token configured
2. ⏳ Start MCP server (`npm run mcp:http`)
3. ⏳ Start ngrok (`npm run mcp:tunnel`)
4. ⏳ Copy public URL
5. ⏳ Configure ChatGPT Custom GPT
6. ⏳ Test in ChatGPT

---

## 📞 Support

If you need help:
1. Check the URL format (must start with `https://`)
2. Verify MCP server is running on localhost:3000
3. Test with curl before using in ChatGPT
4. Check ngrok dashboard: http://localhost:4040

---

**Last Updated:** October 2025
**Ngrok Version:** Latest
**MCP Version:** 2.0 (HTTP)
