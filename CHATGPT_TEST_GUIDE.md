# 🔧 ChatGPT MCP Integration - Troubleshooting Guide

## ⚠️ Problem: "No Response" When Clicking Create

If ChatGPT doesn't respond when you click the create/save button, follow these steps:

---

## 🧪 Testing Checklist

### Step 1: Verify Servers Are Running

```bash
# Terminal 1 - Should show MCP Server running
npm run mcp:http

# Terminal 2 - Should show Ngrok tunnel active
npm run mcp:tunnel
```

**Expected Output:**
- MCP Server: `🚀 MCP Server for Trúc Nghị Project`
- Ngrok: `Forwarding https://... -> http://localhost:3000`

### Step 2: Test Health Endpoint

```bash
curl https://gayle-hematogenous-enid.ngrok-free.dev/health \
  -H "ngrok-skip-browser-warning: true"
```

**Expected Response:**
```json
{"status":"healthy","timestamp":"..."}
```

**If fails:** Server is down or ngrok URL expired (see Step 7)

### Step 3: Test OpenAPI Schema

```bash
curl https://gayle-hematogenous-enid.ngrok-free.dev/openapi.json \
  -H "ngrok-skip-browser-warning: true" | head -20
```

**Expected Output:** Should show OpenAPI structure (starts with `{"openapi":"3.1.0"`)

**If fails:** OpenAPI endpoint not working

### Step 4: Test MCP Tools Endpoint

```bash
curl https://gayle-hematogenous-enid.ngrok-free.dev/mcp/tools \
  -H "ngrok-skip-browser-warning: true"
```

**Expected Response:** JSON array with 9 tools

### Step 5: Test Tool Call

```bash
curl -X POST https://gayle-hematogenous-enid.ngrok-free.dev/mcp/tools/call \
  -H "ngrok-skip-browser-warning: true" \
  -H "Content-Type: application/json" \
  -d '{"name":"get_project_structure","arguments":{}}'
```

**Expected Response:** Should return project structure JSON

### Step 6: Check ChatGPT Settings

1. Go to: https://chatgpt.com/gpts/editor
2. Click "Configure"
3. Look for "Actions" section
4. Check:
   - ✅ Schema URL is: `https://gayle-hematogenous-enid.ngrok-free.dev/openapi.json`
   - ✅ Type is: "REST API"
   - ✅ Auth is: "None"
   - ✅ Method is: "POST"

### Step 7: Check if Ngrok URL Expired

Ngrok free tier changes URL every 2 hours!

```bash
# Run this to get NEW URL
npm run mcp:tunnel

# Output will show:
# Forwarding https://[NEW-URL].ngrok-free.dev -> http://localhost:3000
```

**Then update ChatGPT with NEW URL!**

---

## 🆘 Common Issues & Fixes

### Issue 1: "Failed to build actions from MCP endpoint"

**Causes:**
- ❌ Using wrong URL format
- ❌ Ngrok URL expired
- ❌ Server not running

**Fix:**
```
1. Check servers running: npm run mcp:http & npm run mcp:tunnel
2. Get latest ngrok URL: npm run mcp:tunnel
3. Use correct schema URL: https://[NEW-URL]/openapi.json (with /openapi.json!)
4. Make sure Type is "REST API"
5. Click Save
```

### Issue 2: "Connection timeout"

**Causes:**
- ❌ Ngrok tunnel not running
- ❌ MCP server crashed
- ❌ Network firewall blocking

**Fix:**
```
1. Check Terminal 2 is running: npm run mcp:tunnel
2. Check Terminal 1 is running: npm run mcp:http
3. Test locally: curl http://localhost:3000/health
4. If local works but public doesn't, restart ngrok:
   Kill Terminal 2, run: npm run mcp:tunnel again
```

### Issue 3: "Invalid URL" or "Unsafe URL"

**Causes:**
- ❌ URL doesn't start with https://
- ❌ Using http:// instead of https://

**Fix:**
```
URL MUST be:
✅ https://gayle-hematogenous-enid.ngrok-free.dev/openapi.json
❌ NOT: http://localhost:3000/openapi.json
❌ NOT: http://gayle-...
```

### Issue 4: No Error, But No Response Either

**Causes:**
- ❌ Schema format incompatible with ChatGPT
- ❌ Response format wrong
- ❌ Authentication required but set to None

**Fix:**
```
1. Use the EXACT schema from: 
   https://gayle-hematogenous-enid.ngrok-free.dev/openapi.json

2. Verify locally first:
   curl http://localhost:3000/mcp/tools/call \
     -H "Content-Type: application/json" \
     -d '{"name":"get_project_structure","arguments":{}}'

3. Should return JSON with: {"success":true,"result":{...}}

4. If that works, issue is with ChatGPT config, not server
```

---

## ✅ Complete Verification Test

Run all 8 tests to verify everything:

```bash
# Test 1: Health
curl https://gayle-hematogenous-enid.ngrok-free.dev/health -H "ngrok-skip-browser-warning: true"
# Expected: Status 200, returns {"status":"healthy"...}

# Test 2: OpenAPI Schema
curl https://gayle-hematogenous-enid.ngrok-free.dev/openapi.json -H "ngrok-skip-browser-warning: true"
# Expected: Status 200, returns OpenAPI 3.1.0 schema

# Test 3: Tools List
curl https://gayle-hematogenous-enid.ngrok-free.dev/mcp/tools -H "ngrok-skip-browser-warning: true"
# Expected: Status 200, returns array of 9 tools

# Test 4: Tool Call
curl -X POST https://gayle-hematogenous-enid.ngrok-free.dev/mcp/tools/call \
  -H "ngrok-skip-browser-warning: true" \
  -H "Content-Type: application/json" \
  -d '{"name":"get_project_structure","arguments":{}}'
# Expected: Status 200, returns project data
```

**If all 4 tests pass:** Server is working! Issue is ChatGPT config.

---

## 🎯 Step-by-Step ChatGPT Setup (Verified)

### The CORRECT Way:

1. **Go to:** https://chatgpt.com/gpts/editor

2. **Click:** "Create new GPT"

3. **Fill Name:**
   ```
   Trúc Nghị Project Assistant
   ```

4. **Fill Description:**
   ```
   AI assistant for Trúc Nghị Landing Page with access to codebase
   ```

5. **Add Instructions** (copy from `CHATGPT_CUSTOM_GPT_CONFIG.md`):
   ```
   You are an expert assistant for the Trúc Nghị Landing Page project...
   ```

6. **Click "Configure"** (right side)

7. **Scroll down to "Actions"**

8. **Click "Create new action"** (or "+ Add action")

9. **Fill Schema URL:**
   ```
   https://gayle-hematogenous-enid.ngrok-free.dev/openapi.json
   ```

10. **Set Type:**
    ```
    REST API (or just leave as default)
    ```

11. **Set Auth:**
    ```
    None
    ```

12. **Click "Save"**

13. **Refresh page** (F5 or Cmd+R)

14. **Test by asking:**
    ```
    "What's the project structure?"
    ```

---

## 📝 If Still Not Working

Contact and provide:

1. Screenshot of ChatGPT configure screen
2. Output of: `npm run mcp:tunnel` (to verify URL)
3. Output of: `curl https://[YOUR-URL]/openapi.json -H "ngrok-skip-browser-warning: true"`
4. Error message from ChatGPT (if any)

---

## 🔄 Quick Restart All Services

If nothing works, restart everything:

```bash
# Terminal 1: Kill and restart MCP
Ctrl+C
npm run mcp:http

# Terminal 2: Kill and restart Ngrok
Ctrl+C
npm run mcp:tunnel
# (get new URL from output)

# Then: Update ChatGPT with new Ngrok URL
```

---

**Status:** ✅ All servers verified working

**Last tested:** October 26, 2025

**Next step:** Test in ChatGPT with correct schema URL
