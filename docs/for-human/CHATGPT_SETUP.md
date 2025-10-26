# 💬 ChatGPT + MCP Setup

**Quick guide to use ChatGPT with your project code**

---

## ⏱️ Time: 5 minutes

---

## 📋 Prerequisites

- ✅ Vercel deployment done (auto from GitHub)
- ✅ ChatGPT Plus or higher (free version may not work)
- ✅ Developer mode available

---

## 🔧 Step 1: Check Deployment

1. Go: https://vercel.com/dashboard
2. Find: `trucnghi` project
3. Check: Status = **"Ready"** ✓

**URL will be:** `https://trucnghi.vercel.app/mcp`

---

## 2️⃣ Step 2: Enable Developer Mode

1. Open: https://chatgpt.com
2. Click: Profile (top right)
3. Select: **Settings**
4. Find: **Developer Mode** or **Advanced**
5. Toggle: **ON** ✓

---

## 3️⃣ Step 3: Add MCP Connector

1. Start: **New Chat**
2. Click: **"+"** icon (left side) OR find **"Add sources"**
3. Select: **"Add MCP Connector"** or **"Connect Server"**
4. Fill in:

| Field | Value |
|-------|-------|
| **Name** | `Trúc Nghị MCP` |
| **URL** | `https://trucnghi.vercel.app/mcp` |
| **Type** | `HTTP` (if asked) |

5. Click: **"Trust"** or **"Connect"**

✅ **Done!** You should see tools appear in the chat.

---

## 🎯 Test It

Ask ChatGPT:

```
"Cấu trúc dự án này như thế nào?"
```

Or in English:

```
"What is the project structure?"
```

ChatGPT will use MCP tools automatically and show you the code! 🎉

---

## 🛠️ 9 Tools You Can Use

| Tool | Ask ChatGPT |
|------|------------|
| **1. Read code** | "Show me the Hero component" |
| **2. Find functions** | "Where is the payment handler?" |
| **3. List files** | "Show me all payment-related files" |
| **4. View structure** | "What's the project structure?" |
| **5. See components** | "List all React components" |
| **6. Check payment** | "What's the payment status for ORDER123?" |
| **7. View APIs** | "Show me all API endpoints" |
| **8. Registration** | "Tell me about the registration form" |
| **9. Search code** | "Find all uses of 'RegistrationForm'" |

---

## ⚡ Example Conversations

### Conversation 1: Understand Project

**You:**
```
Explain how this project is structured
```

**ChatGPT:** (Uses MCP tools automatically)
```
Based on the project, I can see:

1. Astro-based landing page
2. React components for interactive features
3. TypeScript for type safety
4. Payment integration with PayOS
5. Registration form...
```

### Conversation 2: Find Code

**You:**
```
Show me the RegistrationForm component
```

**ChatGPT:** (Uses MCP tools)
```
Here's the registration form:

[Shows full code]

It does: [Explains what it does]
```

### Conversation 3: Understand Flow

**You:**
```
How does payment work in this project?
```

**ChatGPT:** (Uses multiple MCP tools)
```
The payment flow:
1. User submits registration form
2. System creates PayOS payment link
3. User redirected to PayOS
4. After payment, webhook updates status
...
```

---

## ❌ Troubleshooting

### "MCP not showing in ChatGPT"

**Try:**
1. Refresh the page
2. Create a new chat
3. Check Developer Mode is ON
4. Check URL is correct

### "Error connecting to MCP"

**Try:**
1. Wait 1-2 minutes (deploy might be in progress)
2. Check: https://trucnghi.vercel.app/health → Should return OK
3. Check URL: `https://trucnghi.vercel.app/mcp`
4. Check Vercel dashboard for errors

### "Tool runs but returns nothing"

**Try:**
1. Be more specific: "Show me src/components/Hero.astro"
2. Instead of: "Show me Hero"
3. ChatGPT should auto-correct if unsure

### "Payment status not working"

**Try:**
1. Use format: "Check order ORDER123"
2. Not: "Check order 123"

---

## 💡 Pro Tips

1. **Be specific** - "Show me Hero component" is better than "Show me components"
2. **Ask step-by-step** - Ask about one thing at a time
3. **For code review** - "Review this code" then paste code to ChatGPT
4. **For changes** - "I want to change X to Y, what should I modify?"
5. **For understanding** - "Explain how X works"

---

## 📊 What's Connected?

When MCP is connected, ChatGPT can:
- ✅ Read any file in your project
- ✅ Search for specific code/functions
- ✅ Show project structure
- ✅ Check payment status
- ✅ List components
- ✅ Understand your architecture

What it **cannot** do:
- ❌ Modify files (read-only)
- ❌ Run commands
- ❌ Access databases
- ❌ Deploy

---

## 🔒 Privacy & Security

**Your data:**
- Only you see the MCP URL
- Code is shown only in your ChatGPT session
- Vercel has access to your code (same as before)
- No data is logged by MCP server

---

## 🎯 Common Questions

**Q: Is my code secure?**
> Your code is only visible to you via ChatGPT. The MCP server is public but only exposes your code to authenticated ChatGPT sessions.

**Q: Can I remove MCP?**
> Yes, simply remove the connector from ChatGPT Settings.

**Q: Do I need to pay extra?**
> No, ChatGPT Plus is enough. MCP server is free.

**Q: Can I use on free ChatGPT?**
> Free tier may not support MCP. Need Plus or higher.

---

## ✨ You're Ready!

1. ✅ Deployment checked
2. ✅ Developer Mode enabled
3. ✅ MCP Connector added
4. ✅ Ready to ask ChatGPT!

**Next:** Open ChatGPT and start asking! 🚀

---

## 📞 Need Help?

- Check: `docs/for-ai/README.md` (for detailed AI instructions)
- Read: `START_HERE.md` (if setup not working)
- See: `MCP_CHATGPT_QUICK_START.md` (quick reference)
