# Cấu trúc thư mục src/

Dự án được tổ chức theo nguyên tắc phân tách rõ ràng giữa các phần của ứng dụng.

## 📁 Cấu trúc chính

```
src/
├── assets/              # Tài nguyên tĩnh (hình ảnh, styles, fonts)
├── components/          # Components dùng chung cho toàn bộ ứng dụng
│   ├── common/         # Meta tags, Analytics, Scripts cơ bản
│   ├── icons/          # Icon components (React)
│   ├── magicui/        # Thư viện UI components (Marquee, etc.)
│   └── ui/             # Base UI components (Button, Form, Background, etc.)
├── sections/           # Các section của trang chủ (Home page sections)
│   ├── hero/           # Hero section
│   ├── benefits/       # Benefits/Features section
│   ├── pricing/        # Pricing section
│   ├── testimonials/   # Testimonials/Reviews section
│   ├── countdown/      # Countdown/Promotion section
│   └── trust-bar/      # Trust bar với logo đối tác
├── layouts/            # Layout components và templates
│   ├── header/         # Navbar và các components header
│   ├── footer/         # Footer components
│   ├── Layout.astro    # Main layout template
│   └── MarkdownLayout.astro # Layout cho markdown pages
├── pages/              # Các trang của ứng dụng (Astro routing)
├── lib/                # Business logic và utilities
│   ├── db/            # Database client và mock data
│   ├── security/      # Security middleware
│   ├── seo/           # SEO utilities (structured data)
│   └── types/         # TypeScript type definitions
├── utils/              # Helper functions và utilities
├── config/             # Configuration files
└── types/              # Global TypeScript types

```

## 🎯 Nguyên tắc tổ chức

### 1. **Sections** (`src/sections/`)
- Chứa các phần **riêng biệt của trang chủ**
- Mỗi section là một module độc lập với index.ts để export
- Ví dụ: Hero, Benefits, Pricing, Testimonials

**Khi nào tạo section mới:**
- Khi bạn thêm một phần lớn, độc lập vào trang chủ
- Khi component chỉ dùng cho trang chủ, không dùng chung

**Cách sử dụng:**
```typescript
import { Hero } from '~/sections/hero';
import { Pricing } from '~/sections/pricing';
```

### 2. **Components** (`src/components/`)
- Chứa **components dùng chung** trong toàn bộ ứng dụng
- Được chia thành các nhóm: `common/`, `ui/`, `icons/`, `magicui/`

**Khi nào đặt vào components:**
- Component được dùng ở nhiều nơi (reusable)
- Component cơ sở (Button, Form, Input, etc.)
- Thư viện UI chung

**Cách sử dụng:**
```typescript
import Button from '~/components/ui/Button.astro';
import { CheckIcon } from '~/components/icons';
```

### 3. **Layouts** (`src/layouts/`)
- Chứa **layout components và templates**
- Header (Navbar) và Footer
- Layout wrappers (Layout.astro, MarkdownLayout.astro)

**Khi nào đặt vào layouts:**
- Component hiển thị ở mọi trang (Navbar, Footer)
- Layout wrapper cho các loại trang khác nhau

**Cách sử dụng:**
```typescript
import Layout from '~/layouts/Layout.astro';
import { Navbar } from '~/layouts/header';
import { FooterContact } from '~/layouts/footer';
```

### 4. **Pages** (`src/pages/`)
- Chứa các **trang của ứng dụng** (Astro file-based routing)
- Mỗi file .astro trong thư mục này tương ứng với một route

### 5. **Lib** (`src/lib/`)
- Chứa **business logic, integrations, và type definitions**
- Database clients, security middleware, SEO utilities
- Không chứa UI components

### 6. **Utils** (`src/utils/`)
- Chứa **helper functions thuần túy**
- Không có dependencies lên components hay business logic
- Ví dụ: format, validation, string manipulation

## 📝 Quy tắc Import

### Sử dụng alias `~/` thay vì relative paths
```typescript
// ✅ Tốt
import { Hero } from '~/sections/hero';
import Button from '~/components/ui/Button.astro';

// ❌ Tránh
import { Hero } from '../../sections/hero';
import Button from '../components/ui/Button.astro';
```

### Import từ index files
Mỗi folder section/layout có file `index.ts` để export:

```typescript
// src/sections/hero/index.ts
export { default as Hero } from './Hero.astro';

// Sử dụng:
import { Hero } from '~/sections/hero';
```

## 🔄 Di chuyển Components

Khi cần di chuyển một component:

1. **Component dùng cho trang chủ** → `src/sections/[tên-section]/`
2. **Component dùng chung** → `src/components/[ui|common|icons]/`
3. **Layout component** → `src/layouts/[header|footer]/`

## 📦 Ví dụ Component Organization

```
Hero.astro          → src/sections/hero/Hero.astro
Pricing.astro       → src/sections/pricing/Pricing.astro
Button.astro        → src/components/ui/Button.astro
Navbar.astro        → src/layouts/header/Navbar.astro
FooterContact.astro → src/layouts/footer/FooterContact.astro
```

## 🚀 Best Practices

1. **Một component, một trách nhiệm** - Mỗi component nên có một mục đích rõ ràng
2. **DRY (Don't Repeat Yourself)** - Tái sử dụng components thay vì copy-paste
3. **Đặt tên rõ ràng** - Tên folder và file phải mô tả rõ nội dung
4. **Import từ index** - Luôn tạo và sử dụng index.ts cho các folder
5. **Sử dụng TypeScript** - Định nghĩa types cho props và data

## 🔍 Tìm kiếm nhanh

- **Trang chủ sections**: `src/sections/`
- **UI components**: `src/components/ui/`
- **Header/Footer**: `src/layouts/header/`, `src/layouts/footer/`
- **Database logic**: `src/lib/db/`
- **Type definitions**: `src/lib/types/`, `src/types/`

