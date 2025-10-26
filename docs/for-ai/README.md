# 📖 AI Instructions - Project Context & How to Help

## 🎯 Project Overview

**Project Name:** Trúc Nghị Landing Page  
**Tech Stack:** Astro 4.0 + React 18 + TypeScript + Tailwind CSS  
**Status:** MCP Server deployed on Vercel for ChatGPT Web integration  
**Purpose:** Educational landing page with registration, payment, and testimonial features

---

## 🔧 What You Should Know

### Project Structure
```
src/
├── components/
│   ├── common/         # Shared components (Navbar, Footer, etc)
│   ├── features/       # Feature components (Hero, Benefits, Pricing, etc)
│   ├── layouts/        # Page layouts
│   ├── ui/             # UI components (Button, Card, Dialog, etc)
│   └── icons/          # Icon components
├── pages/
│   ├── api/            # API endpoints (payment, registration)
│   └── *.astro         # Page components
├── lib/                # Utilities (format, validation, middleware)
├── types/              # TypeScript definitions
└── config/             # Configuration files
```

### Key APIs
```
POST /api/create-payment-link      → Create PayOS payment
POST /api/save-registration        → Save user registration
GET  /api/check-payment-status     → Check order status
POST /api/update-payment-status    → Update payment (webhook)
POST /api/payos-webhook            → Handle PayOS webhook
```

---

## 🛠️ Available Tools (MCP Server)

When the user asks you to help with their project, these are the tools you should use:

### 1. **read_file** - Read file content
```json
{
  "name": "read_file",
  "arguments": {
    "filePath": "src/components/features/hero/Hero.astro"
  }
}
```
**Use when:** User asks you to read/review code

### 2. **search_code** - Find code by keyword
```json
{
  "name": "search_code",
  "arguments": {
    "keyword": "handlePayment",
    "fileType": "tsx"
  }
}
```
**Use when:** Need to find specific functions or implementations

### 3. **search_files** - Find files by pattern
```json
{
  "name": "search_files",
  "arguments": {
    "pattern": "payment",
    "directory": "src/pages/api"
  }
}
```
**Use when:** Need to locate files with specific names

### 4. **list_directory** - List folder contents
```json
{
  "name": "list_directory",
  "arguments": {
    "dirPath": "src/components/features"
  }
}
```
**Use when:** Need to see what's in a directory

### 5. **list_components** - List React components
```json
{
  "name": "list_components",
  "arguments": {
    "category": "features"
  }
}
```
**Use when:** Need to see available components by category

### 6. **get_project_structure** - Get project overview
```json
{
  "name": "get_project_structure",
  "arguments": {}
}
```
**Use when:** User wants to understand project architecture

### 7. **get_api_endpoints** - List all API endpoints
```json
{
  "name": "get_api_endpoints",
  "arguments": {}
}
```
**Use when:** User asks about APIs

### 8. **get_registration_data** - Get registration form info
```json
{
  "name": "get_registration_data",
  "arguments": {}
}
```
**Use when:** User asks about registration feature

### 9. **get_payment_status** - Check payment status
```json
{
  "name": "get_payment_status",
  "arguments": {
    "orderCode": "ORDER123"
  }
}
```
**Use when:** User needs to check payment status

---

## 💡 Common Scenarios & How to Handle

### Scenario 1: User asks "How does X work?"
1. Use `get_project_structure` to understand context
2. Use `search_code` to find relevant implementation
3. Use `read_file` to show the actual code
4. Explain what you found

### Scenario 2: User asks "Where is X in the code?"
1. Use `search_code` with the function/component name
2. Use `search_files` if searching for specific files
3. Use `read_file` to show context

### Scenario 3: User asks "Show me the payment flow"
1. Use `get_api_endpoints` to see payment APIs
2. Use `search_code` to find payment handlers
3. Use `read_file` to show implementation details
4. Trace the flow step by step

### Scenario 4: User asks "List all components"
1. Use `list_directory` for structure
2. Use `list_components` for categorized list
3. Show each component's purpose

---

## 📋 Response Template When Helping

When you help with the project, follow this structure:

```
1. UNDERSTAND THE ASK
   - What is the user trying to do?
   - What information do they need?

2. GATHER INFO (use MCP tools)
   - Call appropriate tools to get code/structure
   - Read relevant files
   - Search for specific implementations

3. PROVIDE ANSWER
   - Show the code or structure
   - Explain what it does
   - Link to related parts

4. SUGGEST NEXT STEPS
   - What else might they need?
   - Any related areas to explore?
```

---

## 🔄 When Creating New Features

If you're helping create a new feature (component, API, etc), here's the process:

### 1. **Plan Phase**
   - Understand requirements
   - Check existing code patterns
   - Plan structure

### 2. **Implementation Phase**
   - Create the file/component
   - Follow existing code patterns
   - Use consistent naming

### 3. **Documentation Phase**
   - Add comments in code
   - Create FOR-HUMAN summary (see docs/for-human)
   - Add FOR-AI instructions (see docs/for-ai)

### 4. **Verification Phase**
   - Verify code works
   - Check for linting issues
   - Test integrations

---

## 🎨 Code Standards

### Naming Conventions
- Components: PascalCase (e.g., `RegistrationForm.tsx`)
- Functions: camelCase (e.g., `handlePayment()`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINT`)
- Files: kebab-case for utils (e.g., `payment-handler.ts`)

### Astro Components
- File extension: `.astro`
- Front matter for imports
- TypeScript for logic

### React Components
- File extension: `.tsx`
- Export as named export
- Use TypeScript for props

### API Routes
- Located in `src/pages/api/`
- File name becomes endpoint (e.g., `create-payment-link.ts` → `/api/create-payment-link`)
- Handle errors properly

---

## 🔐 Important Files & Locations

| File | Purpose | Notes |
|------|---------|-------|
| `mcp-server.js` | MCP tool implementations | Core tools |
| `mcp-server-http.js` | HTTP server for tools | Vercel deployment |
| `api/mcp.js` | Vercel serverless function | Entry point |
| `vercel.json` | Vercel config | URL rewrites |
| `package.json` | Dependencies | NPM scripts |
| `src/config/config.ts` | Project config | Settings |
| `src/types/` | TypeScript definitions | Type safety |

---

## 📱 Development Workflow

### Local Testing
```bash
npm run mcp:http              # Start MCP server locally
npm run dev                   # Start Astro dev server
```

### Building
```bash
npm run build                 # Build for production
npm run preview               # Preview production build
```

### Testing
```bash
npm run test                  # Run tests
npm run test:e2e              # End-to-end tests
```

### Deployment
```bash
git add .
git commit -m "message"
git push origin main          # Auto-deploys to Vercel
```

---

## 🎯 What NOT to Do

❌ **Don't:**
- Make breaking changes without understanding dependencies
- Add features without checking existing patterns
- Modify payment logic without testing
- Delete existing code without confirmation
- Change API endpoints without updating all references

✅ **Do:**
- Check existing code patterns first
- Ask clarifying questions if unclear
- Test changes before confirming
- Document your changes
- Create FOR-HUMAN summary of work done

---

## 📞 Quick Reference

- **MCP Server Live:** https://trucnghi.vercel.app/mcp
- **Health Check:** https://trucnghi.vercel.app/health
- **Project Root:** `D:\trucnghi`
- **Main Branch:** `main` (auto-deploys to Vercel)
- **GitHub:** https://github.com/trankien022/tuvi

---

## 🔄 After Completing Work

**ALWAYS** do these 3 things:

1. **Create FOR-HUMAN summary:**
   ```
   Create/update file in docs/for-human/ with:
   - What you did (1-2 lines)
   - What's working now
   - Next steps (if any)
   ```

2. **Update project docs:**
   - Check if any docs need updating
   - Update code comments if changed

3. **Commit & Push:**
   ```bash
   git add .
   git commit -m "Clear message about what changed"
   git push origin main
   ```

---

## 💬 Example: How to Respond to User

**User says:** "Show me how the payment system works"

**Your process:**
1. Call `get_api_endpoints` → See payment APIs
2. Call `search_code` with keyword "payment" → Find implementations
3. Call `read_file` on those files → Get code
4. Create response:
   ```
   The payment system has 3 main parts:
   
   1. Create Payment Link (POST /api/create-payment-link)
      [show code]
      
   2. Check Payment Status (GET /api/check-payment-status)
      [show code]
      
   3. Handle Webhook (POST /api/payos-webhook)
      [show code]
   ```
5. Call `get_registration_data` if payment is tied to registration
6. Create FOR-HUMAN summary of this explanation

---

## 🎓 Learn by Doing

Every time you help:
- You're learning the project
- Document what you learned
- Next time will be faster

Keep improving! 🚀
