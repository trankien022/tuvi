# 📚 MCP Server - Complete Index

## 🎯 Quick Navigation

### 🚀 **Get Started Quickly**
1. **Read First:** `HTTP_MCP_QUICK_START.txt` (5 min)
2. **Start Server:** `npm run mcp:http`
3. **Open:** http://localhost:3000

---

## 📁 **Core MCP Files**

### Server Implementation

| File | Mô Tả | Dùng Cho |
|------|-------|----------|
| **`mcp-server.js`** | Stdio MCP server (9 tools) | Claude Desktop (direct stdin/stdout) |
| **`mcp-server-http.js`** | HTTP MCP server với dashboard | ChatGPT, web apps, REST API |

### Scripts

| File | Mô Tả |
|------|-------|
| `scripts/test-mcp-server.js` | Test all MCP tools (10 tests) |

---

## 📖 **Documentation Files**

### Essential Guides (Read These!)

| File | Length | Content | For Whom |
|------|--------|---------|----------|
| **`HTTP_MCP_QUICK_START.txt`** | 1 page | Quick start for HTTP server | Everyone |
| **`MCP_HTTP_GUIDE.md`** | ~10 pages | Complete HTTP API guide | Developers |
| **`MCP_SETUP.md`** | ~10 pages | Detailed stdio server guide | Advanced users |

---

## 🛠️ **NPM Commands**

```bash
# HTTP Server (Recommended)
npm run mcp:http           # Start on port 3000
npm run mcp:http:dev       # Start with custom port

# Stdio Server (Original)
npm run mcp:server         # Start stdio server

# Testing
npm run mcp:test           # Run all tests (10 tests)

# Help
npm run mcp:help           # View quick start
```

---

## 🌐 **URLs (HTTP Mode Only)**

When running `npm run mcp:http`:

```
Dashboard:         http://localhost:3000
MCP API:           http://localhost:3000/mcp
Tools List:        http://localhost:3000/mcp/tools
Project Info:      http://localhost:3000/mcp/project-info
Health Check:      http://localhost:3000/health
```

---

## 🛠️ **9 Available Tools**

All tools available in both Stdio and HTTP modes:

1. **`read_file`** - Đọc nội dung file
2. **`search_files`** - Tìm file theo pattern
3. **`search_code`** - Tìm code theo keyword
4. **`list_directory`** - Liệt kê thư mục
5. **`list_components`** - Liệt kê components
6. **`get_registration_data`** - Info form đăng ký
7. **`get_payment_status`** - Info thanh toán
8. **`get_project_structure`** - Tổng quan dự án
9. **`get_api_endpoints`** - Liệt kê API endpoints

---

## 🎯 **Choose Your Mode**

### Mode 1: HTTP (Recommended for Most Users)

**Pros:**
- ✅ Has URLs
- ✅ Beautiful dashboard
- ✅ Works with ChatGPT
- ✅ Works with web apps
- ✅ Easy to share
- ✅ CORS enabled

**Cons:**
- ⚠️ Requires separate server process

**Start:**
```bash
npm run mcp:http
# Then visit: http://localhost:3000
```

**Configure Claude Desktop:**
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

---

### Mode 2: Stdio (Traditional MCP)

**Pros:**
- ✅ Direct integration
- ✅ No separate server needed
- ✅ Simpler setup

**Cons:**
- ⚠️ No URLs
- ⚠️ Only for Claude Desktop
- ⚠️ Can't share easily

**Start:**
```bash
npm run mcp:server
```

**Configure Claude Desktop:**
```json
{
  "mcpServers": {
    "trucnghi-stdio": {
      "command": "node",
      "args": ["D:\\trucnghi\\mcp-server.js"]
    }
  }
}
```

---

## 📋 **Configuration Files Location**

### Claude Desktop Config
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

### VSCode MCP Config (if using VSCode extension)
- `.vscode/mcp.json` (in project root)

---

## 🧪 **Testing**

### Run All Tests
```bash
npm run mcp:test
```

**Expected Output:**
```
✅ Found 9 tools
✅ All tests passed successfully!
```

### Test Individual Tool
```bash
curl -X POST http://localhost:3000/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{"name":"get_project_structure","arguments":{}}'
```

---

## 🔍 **File Organization**

```
D:\trucnghi\
├── mcp-server.js                  # Stdio server
├── mcp-server-http.js             # HTTP server
├── scripts/
│   └── test-mcp-server.js         # Tests
├── MCP_INDEX.md                   # This file
├── HTTP_MCP_QUICK_START.txt       # Quick start
├── MCP_HTTP_GUIDE.md              # HTTP guide
├── MCP_SETUP.md                   # Stdio guide
└── package.json                   # NPM scripts

(Deleted old files for cleanup:
 - QUICK_START_MCP.txt
 - MCP_SUMMARY.md
 - README_MCP.md
 - claude-desktop-config.json)
```

---

## 🚀 **Recommended Setup**

### For Most Users

1. **Start HTTP server:**
   ```bash
   npm run mcp:http
   ```

2. **Open dashboard:**
   ```
   http://localhost:3000
   ```

3. **Test API:**
   ```bash
   curl http://localhost:3000/mcp/tools
   ```

4. **Configure Claude Desktop (optional):**
   - Edit: `%APPDATA%\Claude\claude_desktop_config.json`
   - Add HTTP server config
   - Restart Claude

---

## 💡 **Common Use Cases**

### Use Case 1: Chat with Claude about Project
1. Run: `npm run mcp:http`
2. Configure Claude Desktop
3. Ask: "Explain the registration flow"
4. Claude uses MCP tools automatically

### Use Case 2: Use with ChatGPT
1. Run: `npm run mcp:http`
2. Access via: http://localhost:3000/mcp
3. Configure ChatGPT Custom GPT to use this endpoint

### Use Case 3: Call from Python/JavaScript
```python
import requests
response = requests.post('http://localhost:3000/mcp/tools/call', json={
    'name': 'get_project_structure',
    'arguments': {}
})
print(response.json())
```

### Use Case 4: Monitor with Dashboard
1. Run: `npm run mcp:http`
2. Open: http://localhost:3000
3. See all tools, check health
4. View configuration

---

## 🐛 **Troubleshooting Quick Links**

| Problem | Solution | Guide |
|---------|----------|-------|
| Server won't start | Check port 3000 | MCP_HTTP_GUIDE.md § Troubleshooting |
| Claude can't connect | Verify config path | MCP_HTTP_GUIDE.md § Configuration |
| Tool not found | Check tool name | MCP_HTTP_GUIDE.md § 9 Tools |
| CORS error | Already enabled | MCP_HTTP_GUIDE.md § CORS |

---

## 📊 **Project Info**

- **Framework:** Astro 4.0 + React 18 + TypeScript
- **MCP Version:** 2024-11-05
- **Node Version:** 20.x required
- **HTTP Server Port:** 3000 (configurable)

---

## ✅ **Status: READY TO USE**

- ✅ Stdio mode working
- ✅ HTTP mode ready
- ✅ Dashboard included
- ✅ All 9 tools implemented
- ✅ Tests passing
- ✅ Documentation complete

---

## 🎯 **Next Steps**

1. **Choose mode:** HTTP (recommended) or Stdio
2. **Start server:** `npm run mcp:http` or `npm run mcp:server`
3. **Test connection:** Visit dashboard or call API
4. **Configure client:** Claude Desktop, ChatGPT, etc.
5. **Start using:** Ask questions!

---

## 📞 **Quick Reference**

### Start Server
```bash
npm run mcp:http    # HTTP mode
npm run mcp:server  # Stdio mode
```

### Test Server
```bash
npm run mcp:test    # Run all tests
curl http://localhost:3000/health  # Health check
```

### View Docs
```bash
npm run mcp:help    # View quick start
```

---

## 🎉 **You're All Set!**

MCP Server is ready for:
- ✅ Claude Desktop integration
- ✅ ChatGPT integration
- ✅ Web application access
- ✅ Python/JavaScript calls
- ✅ Production use

**Start now:**
```bash
npm run mcp:http
# Then: http://localhost:3000
```

---

**Created:** October 2025  
**Version:** 2.0 (HTTP)  
**Status:** ✅ Production Ready

Enjoy your MCP Server! 🚀
