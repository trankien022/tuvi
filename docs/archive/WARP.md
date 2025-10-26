# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Trúc Nghi Landing Page** - An Astro 5.0-based landing page for a Vietnamese fortune-telling service (Tử Vi/Bát Tự). Built with TypeScript, React, and Tailwind CSS in server-side rendering mode.

**Tech Stack:**
- Astro 5.0 (SSR mode)
- React 19 + TypeScript
- Tailwind CSS v4
- Vitest (unit tests) + Playwright (e2e tests)
- Supabase (database)
- PayOS (payment integration)

## Common Development Commands

### Development
```bash
# Start dev server (localhost:4321)
npm run dev
# or
npm start
```

### Building & Testing
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run all checks (Astro, ESLint, Prettier)
npm run check

# Individual checks
npm run check:astro      # Astro type checking
npm run check:eslint     # ESLint linting
npm run check:prettier   # Prettier formatting check

# Auto-fix issues
npm run fix              # Fix all (ESLint + Prettier)
npm run fix:eslint       # Auto-fix ESLint issues
npm run fix:prettier     # Auto-format with Prettier
```

### Testing
```bash
# Unit tests with Vitest
npm test                 # Watch mode
npm run test:ui          # Open Vitest UI
npm run coverage         # Generate coverage report

# E2E tests with Playwright
npm run test:e2e         # Run E2E tests

# Note: Unit test files are in src/test/components/
# E2E test files are in src/test/e2e/
```

### Running Single Tests
```bash
# Run specific test file
npx vitest run src/test/components/path/to/test.test.tsx

# Run tests in watch mode for specific file
npx vitest watch src/test/components/path/to/test.test.tsx

# Run specific E2E test
npx playwright test src/test/e2e/specific-test.spec.ts
```

## Project Architecture

### Core Structure Philosophy

This codebase follows a **feature-based organization** within `src/components/` that separates:

1. **Features** (`src/components/features/`) - Landing page sections organized by feature
2. **Layouts** (`src/components/layouts/`) - Header/Footer and page templates
3. **Common** (`src/components/common/`) - Shared utility components
4. **UI** (`src/components/ui/`) - Base UI components (buttons, cards, forms)

### Directory Layout

```
src/
├── components/
│   ├── features/          # Landing page feature sections
│   │   ├── hero/          # Hero section with CTA
│   │   ├── benefits/      # Benefits/features display
│   │   ├── pricing/       # Pricing plans with order form
│   │   ├── testimonials/  # Customer reviews
│   │   ├── countdown/     # Promotional countdown timer
│   │   ├── trust-bar/     # Partner logos marquee
│   │   └── faq/           # FAQ accordion
│   ├── layouts/           # Layout components
│   │   ├── header/        # Navbar, Logo
│   │   ├── footer/        # FooterContact
│   │   ├── Layout.astro   # Main layout wrapper
│   │   └── MarkdownLayout.astro
│   ├── common/            # Shared utilities
│   │   ├── Favicons, CustomStyles, ScrollReveal
│   │   └── index.ts
│   ├── ui/                # Base UI components
│   │   ├── accordion, badge, card, etc.
│   │   └── index.ts
│   ├── magicui/           # Third-party UI library (Marquee, etc.)
│   └── icons/             # Icon components
├── lib/                   # Business logic & utilities
│   ├── security/          # Security middleware
│   ├── seo/               # SEO utilities, structured data
│   └── utils/             # Helper functions
├── config/                # Site configuration
│   ├── site.yaml          # Main site config (metadata, i18n, analytics)
│   ├── constants.ts       # App constants
│   └── fallback-data.ts   # Fallback data
├── pages/                 # Astro file-based routing
├── assets/                # Static resources (images, styles, fonts)
└── types/                 # TypeScript type definitions
```

### Import Aliases

The project uses extensive path aliases for clean imports:

```typescript
// Core aliases
import Component from '@/some/path'              // src/
import Button from '@components/ui/Button.astro' // src/components/
import { Hero } from '@features/hero'            // src/components/features/

// Logic aliases
import util from '@lib/utils/someUtil'           // src/lib/utils/
import type from '@types/someType'               // src/types/

// Assets
import img from '@images/photo.png'              // src/assets/images/

// Legacy alias (also supported)
import Component from '~/some/path'              // src/
```

**Note:** Both `@` and `~` aliases point to `src/`. All aliases are defined in `astro.config.ts` and `tsconfig.json`.

### Key Architectural Patterns

#### 1. Feature Sections with Index Exports

Each feature section has an `index.ts` that exports its main component:

```typescript
// src/components/features/hero/index.ts
export { default as Hero } from './Hero.astro';

// Usage in pages:
import { Hero } from '@features/hero';
```

#### 2. Component Organization Rules

- **Features folder** (`@features/*`): Landing page sections that are NOT reusable elsewhere
- **UI folder** (`@ui/*`): Reusable base components (Button, Card, Form, etc.)
- **Layouts folder** (`@layouts/*`): Header/Footer and page layout wrappers
- **Common folder** (`@common/*`): Shared utility components (ScrollReveal, Favicons, etc.)

#### 3. Astro + React Hybrid

- **Astro components** (`.astro`): For static content and layout structure
- **React components** (`.tsx`): For interactive features (OrderForm, QRPayment, ErrorBoundary)
- React components are client-side hydrated using Astro's `client:*` directives

#### 4. Server-Side Rendering (SSR)

The project runs in SSR mode (`output: 'server'` in `astro.config.ts`). This means:
- Dynamic routes and API endpoints are supported
- Pages are rendered on-demand on the server
- Build output is for server deployment (not static files)

#### 5. Environment Configuration

- **Site metadata**: `src/config/site.yaml` contains SEO metadata, i18n settings, analytics config
- **Environment variables**: Use `.env` file (see `.env.example` for template)
- **Supabase**: Database client configured in `src/lib/supabase.ts`
- **PayOS**: Payment integration (requires API keys in environment)

## Important Development Notes

### When Adding New Components

1. **Is it a landing page section?** → Place in `src/components/features/[section-name]/`
2. **Is it reusable UI?** → Place in `src/components/ui/`
3. **Is it a layout component?** → Place in `src/components/layouts/[header|footer]/`
4. **Is it a shared utility?** → Place in `src/components/common/`

Always create an `index.ts` file in feature folders to export components cleanly.

### Code Quality

- **Linting**: ESLint with TypeScript, Astro, and React support
- **Formatting**: Prettier with Astro plugin
- **Type checking**: TypeScript with strict null checks enabled
- **Pre-commit hooks**: Husky + lint-staged auto-format and lint staged files

### Testing Strategy

- **Unit tests**: Components in `src/test/components/` using Vitest + Testing Library
- **E2E tests**: User flows in `src/test/e2e/` using Playwright (Microsoft Edge)
- **Coverage**: Generated with Vitest coverage reporter

### Build & Deployment

- **Dev server**: Astro dev server on port 4321
- **Build**: Creates SSR-ready build in `dist/` directory
- **Deployment targets**: Vercel (primary), Netlify (configured in `netlify.toml`)
- **Compression**: Astro Compress plugin minifies CSS, HTML, JS in production

### Working with Markdown

- The project supports MDX for content-rich pages
- Custom remark/rehype plugins: reading time calculation, responsive tables, lazy images
- Markdown layouts available: `MarkdownLayout.astro`

### Internationalization

- **Language**: Vietnamese (`vi`) is the primary language
- **Text direction**: LTR (left-to-right)
- i18n config in `src/config/site.yaml`

### SEO & Analytics

- **Structured data**: JSON-LD schemas defined in page frontmatter (see `src/pages/index.astro`)
- **Meta tags**: Configured via `@astrolib/seo` package
- **Google Analytics**: Configure GA ID in `src/config/site.yaml`
- **Sitemap**: Auto-generated by `@astrojs/sitemap`

## File Naming Conventions

- **Astro components**: PascalCase (e.g., `Hero.astro`, `Pricing.astro`)
- **React components**: PascalCase (e.g., `OrderForm.tsx`, `QRPayment.tsx`)
- **Utilities/helpers**: camelCase (e.g., `format.ts`, `validation.ts`)
- **Config files**: kebab-case (e.g., `site.yaml`, `fallback-data.ts`)
- **Index files**: Always use `index.ts` (not `index.tsx` or `index.astro`)

## Recent Refactoring

The project underwent a major restructuring to organize components by feature. The old flat `components/` structure was reorganized into `features/`, `layouts/`, `ui/`, and `common/` subdirectories. See `RESTRUCTURE_SUMMARY.md` for detailed migration history.

**Important:** When updating components, always check if they've been moved to the new structure. Use the import aliases (`@features/*`, `@layouts/*`, `@ui/*`, `@common/*`) for consistency.
