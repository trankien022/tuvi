# 🌐 HTTP MCP Server - Complete Guide

## ✅ HTTP Server READY!

Your **HTTP MCP Server** is now available! 🚀

---

## 📍 URLs & Endpoints

### Main URLs

| URL | Mô Tả |
|-----|-------|
| `http://localhost:3000` | 🎨 Dashboard (UI) |
| `http://localhost:3000/mcp` | 📡 MCP API Endpoint |
| `http://localhost:3000/mcp/tools` | 📋 List all tools |
| `http://localhost:3000/mcp/project-info` | 📊 Project information |
| `http://localhost:3000/health` | 💚 Health check |

---

## 🚀 Quick Start

### Step 1: Start HTTP Server

```bash
npm run mcp:http
# or
npm run mcp:http:dev
```

**Output:**
```
╔════════════════════════════════════════════════════════╗
║     🚀 Trúc Nghị MCP Server (HTTP) - STARTED 🚀       ║
╚════════════════════════════════════════════════════════╝

📍 Dashboard:       http://localhost:3000
📡 MCP API:         http://localhost:3000/mcp
📋 Tools List:      http://localhost:3000/mcp/tools
💚 Health Check:    http://localhost:3000/health
```

### Step 2: Open Dashboard

Mở browser: **http://localhost:3000**

Bạn sẽ thấy:
- ✅ Server status
- 📋 Available tools
- 📡 API documentation
- ⚙️ Configuration guide

### Step 3: Test with cURL

```bash
# Test health
curl http://localhost:3000/health

# Get all tools
curl http://localhost:3000/mcp/tools

# Call a tool
curl -X POST http://localhost:3000/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "get_project_structure",
    "arguments": {}
  }'
```

---

## 📡 API Endpoints

### GET /health

**Health check endpoint**

```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-26T10:30:00.000Z"
}
```

---

### GET /mcp/tools

**List all available tools**

```bash
curl http://localhost:3000/mcp/tools
```

**Response:**
```json
{
  "tools": [
    {
      "name": "read_file",
      "description": "Read the content of a file in the project",
      "inputSchema": { ... }
    },
    // ... more tools
  ],
  "count": 9
}
```

---

### GET /mcp/project-info

**Get project structure info**

```bash
curl http://localhost:3000/mcp/project-info
```

**Response:**
```json
{
  "name": "Trúc Nghị Landing Page",
  "framework": "Astro 4.0 + React 18 + TypeScript",
  "version": "1.0.0-beta.52",
  "directories": { ... },
  "keyFeatures": [ ... ]
}
```

---

### POST /mcp/tools/call

**Call a specific tool**

```bash
curl -X POST http://localhost:3000/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "read_file",
    "arguments": {
      "filePath": "src/config/config.ts"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "result": {
    "filePath": "src/config/config.ts",
    "content": "...",
    "lines": 100,
    "size": 2032
  }
}
```

---

### POST /mcp

**MCP Protocol Endpoint (for Claude Desktop)**

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "method": "tools/list",
    "params": {}
  }'
```

---

## 🛠️ 9 Available Tools

### 1. read_file
Đọc nội dung file

```json
{
  "name": "read_file",
  "arguments": {
    "filePath": "src/components/Hero.astro"
  }
}
```

### 2. search_files
Tìm file theo pattern

```json
{
  "name": "search_files",
  "arguments": {
    "pattern": "payment",
    "directory": "src/pages/api"
  }
}
```

### 3. search_code
Tìm code theo keyword

```json
{
  "name": "search_code",
  "arguments": {
    "keyword": "RegistrationForm",
    "fileType": "tsx"
  }
}
```

### 4. list_directory
Liệt kê thư mục

```json
{
  "name": "list_directory",
  "arguments": {
    "dirPath": "src/components"
  }
}
```

### 5. list_components
Liệt kê components

```json
{
  "name": "list_components",
  "arguments": {
    "category": "features"
  }
}
```

### 6. get_registration_data
Lấy info form đăng ký

```json
{
  "name": "get_registration_data",
  "arguments": {}
}
```

### 7. get_payment_status
Lấy info thanh toán

```json
{
  "name": "get_payment_status",
  "arguments": {
    "orderCode": "ORDER123"
  }
}
```

### 8. get_project_structure
Tổng quan dự án

```json
{
  "name": "get_project_structure",
  "arguments": {}
}
```

### 9. get_api_endpoints
Liệt kê API endpoints

```json
{
  "name": "get_api_endpoints",
  "arguments": {}
}
```

---

## 📋 Configuration for Claude Desktop

### Option 1: HTTP Configuration

Edit `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "trucnghi-http": {
      "url": "http://localhost:3000/mcp",
      "type": "http"
    }
  }
}
```

### Option 2: Keep Original Stdio

Nếu muốn giữ cả hai:

```json
{
  "mcpServers": {
    "trucnghi-stdio": {
      "command": "node",
      "args": ["D:\\trucnghi\\mcp-server.js"]
    },
    "trucnghi-http": {
      "url": "http://localhost:3000/mcp",
      "type": "http"
    }
  }
}
```

---

## 🌐 Use with ChatGPT/Web Apps

### HTTP Benefits

✅ **No need for Claude Desktop**  
✅ **Works with ChatGPT Custom GPT**  
✅ **Works with web applications**  
✅ **Easy to share URL**  
✅ **CORS enabled (all origins)**  

### Example: JavaScript/Node.js

```javascript
const response = await fetch('http://localhost:3000/mcp/tools/call', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'get_project_structure',
    arguments: {}
  })
});

const data = await response.json();
console.log(data.result);
```

### Example: Python

```python
import requests

response = requests.post('http://localhost:3000/mcp/tools/call', json={
    'name': 'get_project_structure',
    'arguments': {}
})

print(response.json()['result'])
```

### Example: cURL

```bash
curl -X POST http://localhost:3000/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{"name": "get_project_structure", "arguments": {}}'
```

---

## 🎯 Real-World Examples

### Example 1: Get Project Info

```bash
curl http://localhost:3000/mcp/project-info | jq
```

### Example 2: Search for Payment Code

```bash
curl -X POST http://localhost:3000/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "search_code",
    "arguments": {
      "keyword": "handlePayment",
      "fileType": "tsx"
    }
  }' | jq
```

### Example 3: Read Registration Component

```bash
curl -X POST http://localhost:3000/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "read_file",
    "arguments": {
      "filePath": "src/components/features/registration/RegistrationForm.tsx"
    }
  }' | jq '.result.content'
```

### Example 4: List All API Endpoints

```bash
curl http://localhost:3000/mcp/tools/call \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "get_api_endpoints",
    "arguments": {}
  }' | jq
```

---

## 🔧 Environment Variables

### Change Port

```bash
# Using environment variable
MCP_PORT=8000 npm run mcp:http

# Or edit mcp-server-http.js
// const PORT = process.env.MCP_PORT || 3000;
```

---

## 📊 Monitoring

### Dashboard

Visit: **http://localhost:3000**

Shows:
- ✅ Server status
- 📡 API endpoints
- 🛠️ All available tools
- 📋 Configuration guide

### Health Check

```bash
watch -n 1 'curl http://localhost:3000/health'
```

---

## 🐛 Troubleshooting

### Server won't start

```bash
# Check if port is in use
netstat -ano | findstr :3000

# Try different port
MCP_PORT=3001 npm run mcp:http
```

### CORS errors

✅ **Already configured!** All origins allowed.

If you need to restrict:
```javascript
// Edit mcp-server-http.js
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
```

### Connection refused

- ✅ Server running? Check: `http://localhost:3000/health`
- ✅ Port correct? Default is 3000
- ✅ Firewall blocking? Check Windows Firewall

---

## 🚀 Next Steps

1. ✅ Start HTTP server: `npm run mcp:http`
2. ✅ Open dashboard: http://localhost:3000
3. ✅ Test API: `curl http://localhost:3000/mcp/tools`
4. ✅ Configure Claude Desktop
5. ✅ Start asking questions!

---

## 📚 Related Files

- `mcp-server-http.js` - HTTP server implementation
- `mcp-server.js` - Tool implementations (shared)
- `package.json` - NPM scripts
- `MCP_SETUP.md` - Stdio server guide
- `README_MCP.md` - Quick reference

---

## 🎉 Success!

Your HTTP MCP Server is ready to:
- ✅ Work with Claude Desktop
- ✅ Work with ChatGPT
- ✅ Work with web applications
- ✅ Share via URL
- ✅ Handle concurrent requests

**Start it now:**
```bash
npm run mcp:http
```

**Then visit:** http://localhost:3000

Enjoy! 🚀
