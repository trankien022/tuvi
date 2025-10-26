# ✅ Feature Implementation Checklist for AI

When you're asked to create a new feature, component, or API, follow this checklist:

---

## 📋 Phase 1: Planning (5 min)

Before writing any code:

- [ ] **Understand Requirements**
  - What does the user want?
  - What problem does it solve?
  - Any specific constraints?

- [ ] **Gather Context**
  - Call `get_project_structure` to understand existing architecture
  - Check `list_components` to see similar features
  - Review related API endpoints with `get_api_endpoints`

- [ ] **Check Existing Code**
  - Use `search_code` to find similar implementations
  - Look for patterns to follow
  - Identify reusable components

- [ ] **Plan Structure**
  - Where will the component/API go?
  - What will it be named?
  - What dependencies does it have?

---

## 🏗️ Phase 2: Implementation (varies)

### For React Components:

- [ ] **Create Component File**
  - Location: `src/components/` (appropriate subfolder)
  - Naming: PascalCase (e.g., `MyComponent.tsx`)
  - Include TypeScript types for props

- [ ] **Add to Exports**
  - Update `src/components/*/index.ts` to export the component

- [ ] **Follow Code Standards**
  - Use existing component patterns
  - Add JSDoc comments
  - Use Tailwind for styling
  - Import icons from `/src/components/icons`

- [ ] **Add Types**
  - Create interfaces in `src/types/` if needed
  - Use proper TypeScript types

**Template:**
```tsx
// src/components/features/myfeature/MyComponent.tsx
import { FC } from 'react';

interface MyComponentProps {
  title: string;
  description?: string;
}

export const MyComponent: FC<MyComponentProps> = ({ 
  title, 
  description 
}) => {
  return (
    <div className="...">
      {/* Your component */}
    </div>
  );
};

export default MyComponent;
```

### For Astro Components:

- [ ] **Create Component File**
  - Location: `src/components/` (appropriate subfolder)
  - Naming: PascalCase (e.g., `MyComponent.astro`)

- [ ] **Separate Frontmatter**
  - Import dependencies at top
  - Define variables/functions
  - Use TypeScript for type safety

- [ ] **Structure**
  - Clear separation between logic and template
  - Use Tailwind classes
  - Import other components properly

**Template:**
```astro
---
// src/components/features/myfeature/MyComponent.astro
import { Image } from 'astro:assets';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="...">
  <!-- Your content -->
</div>

<style>
  /* Optional: scoped styles */
</style>
```

### For API Routes:

- [ ] **Create API File**
  - Location: `src/pages/api/`
  - Naming: kebab-case (e.g., `my-endpoint.ts`)
  - URL will be: `/api/my-endpoint`

- [ ] **Error Handling**
  - Validate input
  - Handle errors gracefully
  - Return proper HTTP status codes

- [ ] **Type Safety**
  - Define request/response types
  - Validate with Zod if complex

**Template:**
```typescript
// src/pages/api/my-endpoint.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validate input
    if (request.headers.get('content-type') !== 'application/json') {
      return new Response(
        JSON.stringify({ error: 'Invalid content type' }),
        { status: 400 }
      );
    }

    const data = await request.json();

    // Process request
    const result = { /* ... */ };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
};
```

### For Utilities/Helpers:

- [ ] **Create Utils File**
  - Location: `src/lib/utils/` or appropriate subfolder
  - Naming: kebab-case (e.g., `my-helper.ts`)
  - Export named functions

- [ ] **Add Types**
  - Type all parameters
  - Type return values

- [ ] **Document**
  - Add JSDoc comments
  - Explain what it does

**Template:**
```typescript
// src/lib/utils/my-helper.ts

/**
 * Does something useful
 * @param input - The input value
 * @returns The processed result
 */
export const myHelper = (input: string): string => {
  // Implementation
  return result;
};
```

---

## 📝 Phase 3: Documentation (5-10 min)

### Code Documentation:

- [ ] **Add Comments**
  - JSDoc for functions
  - Inline comments for complex logic
  - Explain the "why", not just the "what"

- [ ] **Update Related Types**
  - Add to `src/types/` if needed
  - Update interfaces/types

### Project Documentation:

- [ ] **Create FOR-HUMAN Summary**
  - File: `docs/for-human/FEATURE_NAME.md`
  - Include: What was done, what works, next steps

- [ ] **Create FOR-AI Instructions** (if complex)
  - File: `docs/for-ai/FEATURE_NAME.md`
  - Include: How the feature works, how to modify it

- [ ] **Update README** (if significant)
  - Add to feature list
  - Link to documentation

---

## 🧪 Phase 4: Verification (10-15 min)

### Testing:

- [ ] **Manual Testing**
  - Test basic functionality
  - Test edge cases
  - Check error handling

- [ ] **Integration Testing**
  - Does it work with other features?
  - Are all dependencies properly imported?

- [ ] **Visual Testing**
  - Does it look correct?
  - Responsive on mobile?
  - Consistent with design?

### Code Quality:

- [ ] **Linting**
  ```bash
  npm run fix:eslint
  npm run check:astro
  ```

- [ ] **TypeScript Check**
  ```bash
  npm run check:astro
  ```

- [ ] **No Breaking Changes**
  - Existing features still work?
  - APIs unchanged?
  - No deleted code?

---

## 🔄 Phase 5: Finalization (5 min)

### Git & Deployment:

- [ ] **Commit Changes**
  ```bash
  git add .
  git commit -m "Add: Brief description of feature"
  ```

- [ ] **Push to GitHub**
  ```bash
  git push origin main
  ```

- [ ] **Verify Deployment**
  - Check Vercel dashboard
  - Confirm new version deployed

### Documentation:

- [ ] **Create FOR-HUMAN Summary**
  
  ```markdown
  # Feature: [Feature Name]
  
  ## What's Done
  - Created [Component/API/Utility]
  - Location: [file path]
  - Status: ✅ Working
  
  ## What It Does
  - [Brief description]
  
  ## How to Use
  - [Usage example]
  
  ## Next Steps
  - [If any]
  ```

- [ ] **Update MCP Tools** (if applicable)
  - Does it need a new MCP tool?
  - Add to `mcp-server.js` if yes

- [ ] **Link Documentation**
  - File: `docs/for-ai/README.md`
  - Add reference to new feature docs

---

## 📊 Quality Checklist

Before declaring done, verify:

| Check | Status |
|-------|--------|
| Code follows project patterns | ✓ |
| TypeScript types added | ✓ |
| Comments added | ✓ |
| Linting passes | ✓ |
| Tested locally | ✓ |
| No breaking changes | ✓ |
| Documentation created | ✓ |
| FOR-HUMAN summary made | ✓ |
| Committed & pushed | ✓ |

---

## 🚨 Common Issues & Solutions

### Issue: "Component not working"
- [ ] Check imports are correct
- [ ] Verify TypeScript types match
- [ ] Check props being passed correctly
- [ ] Look at browser console for errors

### Issue: "API returning 500 error"
- [ ] Add console logs to debug
- [ ] Check request/response format
- [ ] Verify dependencies available
- [ ] Test with cURL first

### Issue: "Build fails"
- [ ] Run `npm run check:astro`
- [ ] Fix TypeScript errors
- [ ] Check for import errors
- [ ] Verify file paths

### Issue: "Linting errors"
- [ ] Run `npm run fix:eslint`
- [ ] Check code format
- [ ] Verify naming conventions

---

## 💡 Pro Tips

1. **Always look at similar features first** - Copy patterns, don't reinvent
2. **Write types before implementation** - Helps clarify the design
3. **Test edge cases** - Empty inputs, null values, large data
4. **Document as you go** - Don't leave it for later
5. **Make small commits** - Easier to debug if something breaks
6. **Ask for clarification** - Better to ask than assume

---

## 📞 When to Ask User

- ❓ "Is this the right approach?"
- ❓ "Should I modify this existing component or create new?"
- ❓ "Where should this file go?"
- ❓ "What should this be named?"
- ❓ "Do you want me to test this?"

---

## ✨ Success Indicator

✅ You're done when:
- Code is written
- Tests pass
- Documentation created
- FOR-HUMAN summary made
- Changes committed & pushed
- Vercel deployment confirmed
