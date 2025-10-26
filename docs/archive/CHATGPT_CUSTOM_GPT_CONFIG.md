# 🤖 ChatGPT Custom GPT - Trúc Nghị Project MCP Integration

## ✅ Setup Complete! Your Ngrok URL is Ready

```
🔗 Public URL: https://gayle-hematogenous-enid.ngrok-free.dev
🎯 MCP Endpoint: https://gayle-hematogenous-enid.ngrok-free.dev/mcp
✅ Status: Ready
```

---

## 📋 Step-by-Step ChatGPT Setup

### **Step 1: Go to ChatGPT Custom GPT Editor**

1. Open: https://chatgpt.com/gpts/editor
2. Click "**Create new GPT**" (or edit existing)
3. You'll see a form on the right side

### **Step 2: Fill Basic Info**

**Name:**
```
Trúc Nghị Project Assistant
```

**Description:**
```
AI assistant with full access to the Trúc Nghị Landing Page project codebase. Can read files, search code, analyze components, and provide detailed project information.
```

**Instructions:**
```
You are an expert assistant for the Trúc Nghị Landing Page project. You have access to the complete codebase through MCP tools.

## Your Capabilities

You can:
1. **Read Files** - Access any project file (src/, config/, etc.)
2. **Search Code** - Find functions, components, or patterns
3. **List Components** - View all React/Astro components
4. **Check Payment Status** - Understand PayOS integration
5. **View Registration Flow** - Analyze the 4-step registration system
6. **Explore API Endpoints** - See all backend endpoints
7. **Analyze Project Structure** - Understand the architecture

## Available Tools

1. **read_file** - Read file contents
   - Example: "Show me the registration form component"
   
2. **search_code** - Find code by keyword
   - Example: "Find handlePaymentSuccess function"
   
3. **search_files** - Find files by pattern
   - Example: "Find all payment-related files"
   
4. **list_directory** - List directory contents
   - Example: "What's in the components folder?"
   
5. **list_components** - List all components
   - Example: "Show me all UI components"
   
6. **get_project_structure** - Get project overview
   - Example: "What's the project structure?"
   
7. **get_api_endpoints** - List all API endpoints
   - Example: "Show me all API endpoints"
   
8. **get_registration_data** - Get registration system info
   - Example: "Explain the registration flow"
   
9. **get_payment_status** - Get payment integration info
   - Example: "How is payment handled?"

## How to Use

**For Questions:**
- "Explain the payment flow"
- "How does registration work?"
- "Show me the Hero component"
- "Find all components using React"

**For Code Analysis:**
- "Analyze the RegistrationForm component"
- "What functions handle payments?"
- "Show me the API endpoints"

**For Navigation:**
- "What files are in the src/components folder?"
- "List all pages in the project"
- "Find files related to payment"

## Best Practices

1. Always use tools to get accurate information
2. Provide code examples from actual files
3. Explain project structure when relevant
4. Suggest improvements when applicable

## Project Info

- **Framework:** Astro 4.0 + React 18 + TypeScript
- **Main Features:** Landing page with registration, payment integration, testimonials
- **Payment System:** PayOS integration
- **Backend:** API routes for registration, payment status, webhooks
- **Frontend:** React components with Tailwind CSS

Let's make developing this project awesome! 🚀
```

### **Step 3: Add Actions/Tools**

1. In the ChatGPT editor, find "**Configure**" section on the right
2. Look for "**Actions**" button
3. Click "**Create new action**" or "**Add action**"
4. Fill in:

**Name:**
```
Trúc Nghị Project MCP
```

**Schema URL / API Endpoint:**
```
https://gayle-hematogenous-enid.ngrok-free.dev/mcp
```

**Type:**
```
REST API (POST/JSON)
```

**Authentication:**
```
None (leave blank for now)
```

**Header (Optional):**
```
Add header: "ngrok-skip-browser-warning: true"
```

### **Step 4: Save & Test**

1. Click "**Save**"
2. Go to main chat area
3. Test by asking:

```
"What's the project structure of Trúc Nghị?"
```

---

## 🧪 Test Examples

### Example 1: Project Overview
```
You: What is the Trúc Nghị project?

ChatGPT (using MCP):
1. Calls get_project_structure()
2. Returns: Framework, directories, features
3. Provides detailed overview
```

### Example 2: Payment Integration
```
You: How is payment handled?

ChatGPT (using MCP):
1. Calls get_payment_status()
2. Calls search_code("payment")
3. Calls read_file("src/pages/api/create-payment-link.ts")
4. Explains the complete flow
```

### Example 3: Registration Flow
```
You: Explain the registration process

ChatGPT (using MCP):
1. Calls get_registration_data()
2. Calls read_file("RegistrationForm.tsx")
3. Calls get_api_endpoints()
4. Provides step-by-step guide
```

---

## 🔗 Additional URLs (for reference)

| Resource | URL |
|----------|-----|
| MCP Dashboard | http://localhost:3000 |
| MCP API | https://gayle-hematogenous-enid.ngrok-free.dev/mcp |
| Health Check | https://gayle-hematogenous-enid.ngrok-free.dev/health |
| Tools List | https://gayle-hematogenous-enid.ngrok-free.dev/mcp/tools |

---

## ⚠️ Important Notes

### URL Changes
- ⚠️ **Ngrok free tier URLs change every 2 hours**
- If the URL stops working, run: `npm run mcp:tunnel` to get new URL
- Update ChatGPT action with new URL

### Making it Permanent
To get a stable URL:
1. Upgrade ngrok to Pro ($5/month)
2. Reserve a domain: https://dashboard.ngrok.com/domains
3. Use that domain instead of the free URL

### Keep Servers Running
- Terminal 1: `npm run mcp:http` (MCP Server)
- Terminal 2: `npm run mcp:tunnel` (Ngrok tunnel)

Both must be running for ChatGPT to work!

---

## 📞 Troubleshooting

### Problem: "Failed to connect to action"
```
✓ Check that ngrok is running: npm run mcp:tunnel
✓ Check that MCP server is running: npm run mcp:http
✓ Try the health check URL in browser
```

### Problem: "Unsafe URL"
```
✓ Make sure URL starts with https:// (not http://)
✓ URL should be: https://gayle-hematogenous-enid.ngrok-free.dev/mcp
```

### Problem: "Action not working"
```
✓ Click "Save" after making changes
✓ Refresh ChatGPT page
✓ Try a simple question first
```

---

## 🎉 You're All Set!

Your ChatGPT Custom GPT is now connected to your Trúc Nghị project!

**Next Steps:**
1. ✅ Create the Custom GPT with the config above
2. ✅ Test with simple questions
3. ✅ Start using it for project analysis
4. ✅ Share the Custom GPT link with others (if desired)

---

## 📅 Current Setup

- **Date:** October 26, 2025
- **Ngrok URL:** https://gayle-hematogenous-enid.ngrok-free.dev
- **MCP Server:** http://localhost:3000
- **Status:** ✅ Active & Ready

---

**Happy coding with AI! 🚀**
