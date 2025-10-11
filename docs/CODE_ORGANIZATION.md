# 📋 Code Organization - Trúc Nghị Landing Page

## 🌲 1. Cây Thư Mục (3 Cấp)

```
trucnghi/
├── 📁 src/                          # Source code chính
│   ├── 📁 components/               # React & Astro components
│   │   ├── common/                  # Shared components (Analytics, Meta, Toggle...)
│   │   ├── icons/                   # Icon components
│   │   ├── magicui/                 # Magic UI library (Marquee)
│   │   └── ui/                      # UI primitives (Button, Form, Timeline...)
│   │
│   ├── 📁 layouts/                  # Layout templates
│   │   ├── footer/                  # Footer components
│   │   ├── header/                  # Header components (Logo, Navbar)
│   │   ├── Layout.astro             # Main layout
│   │   └── MarkdownLayout.astro     # Markdown content layout
│   │
│   ├── 📁 sections/                 # Page sections (landing page blocks)
│   │   ├── benefits/                # Benefits section
│   │   ├── countdown/               # Countdown timer
│   │   ├── hero/                    # Hero section
│   │   ├── pricing/                 # Pricing tables
│   │   ├── testimonials/            # Customer testimonials
│   │   └── trust-bar/               # Trust indicators
│   │
│   ├── 📁 pages/                    # Astro pages (routing)
│   │   ├── 404.astro
│   │   └── index.astro
│   │
│   ├── 📁 lib/                      # Business logic & utilities
│   │   ├── db/                      # Database layer (Supabase)
│   │   ├── security/                # Security middleware
│   │   ├── seo/                     # SEO utilities
│   │   └── types/                   # Type definitions
│   │
│   ├── 📁 utils/                    # Helper functions
│   │   ├── directories.ts
│   │   ├── images.ts
│   │   ├── permalinks.ts
│   │   └── validation.ts
│   │
│   ├── 📁 config/                   # Configuration files
│   │   ├── constants.ts
│   │   └── fallback-data.ts
│   │
│   ├── 📁 assets/                   # Static assets
│   │   ├── favicons/
│   │   ├── images/
│   │   └── styles/
│   │
│   ├── 📁 hooks/                    # React hooks (hiện tại trống)
│   ├── 📁 services/                 # API services (hiện tại trống)
│   └── 📁 types/                    # Global types
│
├── 📁 public/                       # Public static files
│   ├── logo/                        # Company logos
│   ├── decapcms/                    # CMS configuration
│   ├── _headers
│   ├── qr-payment.jpg
│   └── robots.txt
│
├── 📁 vendor/                       # Third-party integrations
│   └── integration/                 # Custom Astro integration
│
├── 📁 docs/                         # Documentation
│   ├── CODE_ORGANIZATION.md         # Tài liệu này
│   ├── MIGRATION_GUIDE.md
│   └── RESTRUCTURE_SUMMARY.md
│
├── 📁 nginx/                        # Server configuration
│   └── nginx.conf
│
├── 📄 astro.config.ts              # Astro configuration
├── 📄 tailwind.config.js           # Tailwind CSS config
├── 📄 tsconfig.json                # TypeScript config
├── 📄 package.json                 # Dependencies
└── 📄 components.json              # shadcn/ui config
```

---

## 🎯 2. Phân Loại Thư Mục Theo Vai Trò

### 🎨 **UI Layer** - Presentation
| Thư Mục | Mục Đích | Công Nghệ |
|---------|----------|-----------|
| `src/components/` | Reusable UI components | React + Astro |
| `src/layouts/` | Page layout templates | Astro |
| `src/sections/` | Landing page sections | Astro |
| `src/assets/` | Images, icons, styles | Static files |
| `public/` | Direct public access files | Static files |

### ⚙️ **Logic Layer** - Business Logic
| Thư Mục | Mục Đích | Chức Năng |
|---------|----------|-----------|
| `src/lib/` | Core business logic | DB, Security, SEO |
| `src/utils/` | Helper functions | Image processing, validation |
| `src/hooks/` | React hooks | ⚠️ Hiện tại trống |
| `src/services/` | API services | ⚠️ Hiện tại trống |

### 🔧 **Config Layer** - Configuration
| File/Thư Mục | Mục Đích |
|--------------|----------|
| `src/config/` | App constants & fallback data |
| `astro.config.ts` | Astro framework config |
| `tailwind.config.js` | Styling configuration |
| `tsconfig.json` | TypeScript compiler options |
| `components.json` | shadcn/ui configuration |
| `eslint.config.js` | Linting rules |

### 📦 **Asset Layer** - Static Resources
| Thư Mục | Nội Dung |
|---------|----------|
| `src/assets/favicons/` | Browser icons |
| `src/assets/images/` | Optimized images |
| `src/assets/styles/` | Global CSS |
| `public/logo/` | Partner/company logos |

### 🖥️ **Server Layer** - Infrastructure
| Thư Mục | Mục Đích |
|---------|----------|
| `src/lib/db/` | Database client (Supabase) |
| `src/lib/security/` | Security middleware |
| `nginx/` | Nginx configuration |
| `netlify.toml` / `vercel.json` | Deployment config |

### 📝 **Type Layer** - Type Definitions
| Thư Mục | Mục Đích |
|---------|----------|
| `src/types/` | Global type definitions |
| `src/lib/types/` | Library-specific types |
| `vendor/integration/types.d.ts` | Vendor types |

---

## 🔍 3. Đề Xuất Tái Cấu Trúc

### ⚠️ **Vấn Đề Hiện Tại**

#### 1. **Trùng Lặp Thư Mục Types**
```
❌ Hiện tại:
src/
  ├── types/          # Global types
  ├── types.d.ts      # Duplicate?
  └── lib/
      └── types/      # Library types
```

**Giải pháp:**
```
✅ Nên:
src/
  └── types/
      ├── index.ts        # Re-export all types
      ├── global.d.ts     # Global declarations
      ├── database.ts     # Database types
      ├── components.ts   # Component types
      └── api.ts          # API types
```

#### 2. **Thư Mục Trống Không Sử Dụng**
```
❌ src/hooks/     # Empty
❌ src/services/  # Empty
```

**Giải pháp:**
- **Nếu không sử dụng**: Xóa để giữ codebase sạch
- **Nếu có kế hoạch sử dụng**: Tạo file `.gitkeep` hoặc README.md giải thích

#### 3. **Cấu Trúc Config Phân Tán**
```
❌ Hiện tại:
src/
  ├── config/          # App config
  ├── config.yaml      # Vendor config
  └── lib/
      └── ...
```

**Giải pháp:**
```
✅ Nên:
src/
  └── config/
      ├── index.ts           # Main config export
      ├── constants.ts       # Constants
      ├── fallback-data.ts   # Fallback data
      ├── app.yaml           # App config (rename từ config.yaml)
      └── env.ts             # Environment variables
```

#### 4. **Sections vs Components Không Rõ Ràng**
Cả `sections/` và `components/` đều chứa UI, gây nhầm lẫn.

**Giải pháp:**
```
✅ Tổ chức lại:
src/
  ├── components/
  │   ├── ui/           # Atomic components (Button, Form...)
  │   ├── common/       # Shared components
  │   └── features/     # 🆕 Feature-based components
  │       ├── hero/
  │       ├── pricing/
  │       ├── testimonials/
  │       └── ...
  │
  └── pages/
      └── index.astro   # Import từ components/features/
```

#### 5. **Vendor Integration Nên Được Tách Ra**
```
❌ vendor/integration/  # Custom integration trong source

✅ Đề xuất:
- Nếu là package riêng → Tách thành npm package
- Nếu chỉ config → Chuyển vào src/lib/integrations/
```

### 🎯 **Cấu Trúc Lý Tưởng Đề Xuất**

```
src/
├── app/                      # 🆕 Application layer
│   ├── routes/               # Route handlers (nếu cần API routes)
│   └── middleware/           # App middleware
│
├── components/               # UI Components
│   ├── ui/                   # Atomic UI components
│   ├── features/             # 🆕 Feature-specific components
│   ├── layouts/              # Layout components
│   └── common/               # Shared components
│
├── lib/                      # Core libraries
│   ├── db/
│   ├── api/                  # 🆕 API clients
│   ├── hooks/                # React hooks
│   ├── utils/                # Pure functions
│   └── validations/          # Schema validations (Zod)
│
├── config/                   # All configuration
│   ├── index.ts
│   ├── constants.ts
│   ├── site.ts               # Site metadata
│   └── integrations/         # Third-party integrations
│
├── types/                    # Type definitions
│   ├── index.ts
│   ├── global.d.ts
│   └── *.ts
│
├── assets/                   # Static assets
│   ├── images/
│   ├── icons/
│   └── styles/
│
└── pages/                    # Astro pages
    └── *.astro
```

---

## 🗺️ 4. Alias Mapping Đề Xuất

### **Hiện Tại**
```json
// tsconfig.json
{
  "paths": {
    "~/*": ["src/*"]  // ✅ Đã có, nhưng chưa đủ
  }
}
```

### **Đề Xuất Cải Tiến**

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      // Core aliases
      "@/*": ["src/*"],                      // Root alias
      "@components/*": ["src/components/*"], // Components
      "@ui/*": ["src/components/ui/*"],      // UI primitives
      "@features/*": ["src/components/features/*"], // Feature components
      "@layouts/*": ["src/layouts/*"],       // Layouts
      
      // Logic aliases
      "@lib/*": ["src/lib/*"],               // Libraries
      "@utils/*": ["src/lib/utils/*"],       // Utilities
      "@hooks/*": ["src/lib/hooks/*"],       // Hooks
      "@api/*": ["src/lib/api/*"],           // API clients
      "@db/*": ["src/lib/db/*"],             // Database
      
      // Config & Types
      "@config/*": ["src/config/*"],         // Configuration
      "@types/*": ["src/types/*"],           // Types
      
      // Assets
      "@assets/*": ["src/assets/*"],         // Assets
      "@images/*": ["src/assets/images/*"],  // Images
      "@styles/*": ["src/assets/styles/*"],  // Styles
      
      // Pages
      "@pages/*": ["src/pages/*"],           // Pages
      
      // Keep legacy alias for backward compatibility
      "~/*": ["src/*"]                       // Legacy alias
    }
  }
}
```

### **Cập Nhật Vite Config**
```typescript
// astro.config.ts
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@ui': path.resolve(__dirname, './src/components/ui'),
        '@features': path.resolve(__dirname, './src/components/features'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@utils': path.resolve(__dirname, './src/lib/utils'),
        '@hooks': path.resolve(__dirname, './src/lib/hooks'),
        '@api': path.resolve(__dirname, './src/lib/api'),
        '@db': path.resolve(__dirname, './src/lib/db'),
        '@config': path.resolve(__dirname, './src/config'),
        '@types': path.resolve(__dirname, './src/types'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@images': path.resolve(__dirname, './src/assets/images'),
        '@styles': path.resolve(__dirname, './src/assets/styles'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
```

### **Ví Dụ Sử Dụng**

#### ❌ **Trước (Relative imports)**
```typescript
// src/components/features/hero/Hero.astro
import Button from '../../../components/ui/Button.astro';
import { FALLBACK_PACKAGES } from '../../../config/fallback-data.ts';
import { SITE_NAME } from '../../../config/constants.ts';
import HeroImage from '../../../assets/images/hero-image.png';
```

#### ✅ **Sau (Alias imports)**
```typescript
// src/components/features/hero/Hero.astro
import Button from '@ui/Button.astro';
import { FALLBACK_PACKAGES } from '~/config/fallback-data';
import { SITE_NAME } from '~/config/constants';
import HeroImage from '~/assets/images/hero-image.png';
```

---

## 📊 5. Metrics & Phân Tích

### **Thống Kê Thư Mục**
| Layer | Số Thư Mục | Trạng Thái | Mức Độ Ưu Tiên |
|-------|------------|------------|-----------------|
| UI (components, layouts) | 12 | ✅ Tốt | Medium |
| Logic (lib, utils) | 8 | ⚠️ Cần tái cấu trúc | High |
| Config | 4 | ⚠️ Phân tán | High |
| Assets | 3 | ✅ Tốt | Low |
| Server | 2 | ✅ Tốt | Low |

### **Mức Độ Ưu Tiên Refactor**
1. 🔴 **High Priority**
   - [ ] Hợp nhất thư mục types
   - [ ] Thêm aliases vào tsconfig
   - [ ] Di chuyển sections → components/features

2. 🟡 **Medium Priority**
   - [ ] Xóa/Sử dụng thư mục hooks và services
   - [ ] Tổ chức lại config
   - [ ] Tạo lib/api và lib/validations

3. 🟢 **Low Priority**
   - [ ] Tách vendor integration
   - [ ] Tối ưu cấu trúc assets

---

## 🚀 6. Action Items

### **Immediate (Tuần này)**
```bash
# 1. Cập nhật aliases
✅ Cập nhật tsconfig.json với aliases mới
✅ Cập nhật astro.config.ts với Vite aliases
✅ Test import với aliases mới

# 2. Clean up
✅ Xóa src/hooks/ nếu không dùng
✅ Xóa src/services/ nếu không dùng
✅ Merge src/types.d.ts vào src/types/
```

### **Short-term (Tháng này)**
```bash
# 3. Restructure
✅ Di chuyển sections/ → components/features/
✅ Tổ chức lại config/
✅ Tạo lib/api/ và lib/validations/
```

### **Long-term (Quý này)**
```bash
# 4. Documentation
✅ Tạo ARCHITECTURE.md
✅ Tạo CONTRIBUTING.md
✅ Component documentation (Storybook?)
```

---

## 📚 7. Best Practices

### **Import Order**
```typescript
// 1. External dependencies
import React from 'react';
import { z } from 'zod';

// 2. Internal aliases (alphabetical)
import Button from '@ui/Button';
import { useAuth } from '@hooks/useAuth';
import { SITE_NAME } from '@config/constants';

// 3. Relative imports (if needed)
import styles from './Hero.module.css';

// 4. Types
import type { Props } from './Hero.types';
```

### **File Naming**
- Components: `PascalCase.astro` / `PascalCase.tsx`
- Utils/Libs: `camelCase.ts`
- Types: `camelCase.ts` / `PascalCase.types.ts`
- Config: `lowercase.ts` / `kebab-case.ts`

### **Folder Structure Per Feature**
```
components/features/pricing/
├── Pricing.astro           # Main component
├── PricingCard.tsx         # Sub-component
├── Pricing.types.ts        # Types
├── Pricing.utils.ts        # Helper functions
├── Pricing.test.ts         # Tests
├── index.ts                # Export barrel
└── README.md               # Documentation
```
