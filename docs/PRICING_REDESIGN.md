# Pricing Page Redesign với Shadcn UI

## Tổng quan
Đã thiết kế lại trang pricing sử dụng shadcn UI components để có giao diện hiện đại, professional và dễ bảo trì hơn.

## Các thay đổi chính

### 1. Components mới
- **PricingCard.tsx**: Card component với shadcn UI
  - Sử dụng Card, Badge, Button từ shadcn
  - Responsive design
  - Smooth animations và hover effects
  - Highlighted card cho gói phổ biến nhất
  - Icon checkmarks cho features

- **PricingToggle.tsx**: Toggle component cho yearly/monthly pricing (chuẩn bị cho tương lai)
  - Accessible switch component
  - Smooth transitions
  - Hiển thị discount badge

### 2. Shadcn UI Components đã cài đặt
- `@shadcn/card`: Card components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- `@shadcn/badge`: Badge component với variants
- `@shadcn/button`: Button component với variants và sizes

### 3. Theme & Styling
- Cập nhật CSS variables cho shadcn theme
- Primary color: Purple/Indigo (phù hợp với hero section)
- Dark mode support đầy đủ
- Smooth animations:
  - Card hover: scale transform + shadow
  - Button hover: với arrow animation
  - Featured badge: pulse animation

### 4. Cải thiện UI/UX

#### Visual Enhancements
- Gradient overlays cho highlighted cards
- Smooth hover effects với scale transforms
- Shadow effects với colored shadows
- Modern card design với rounded corners

#### Animations
- Fade-up animation với ScrollReveal
- Staggered animation delays cho mỗi card
- Hover scale effects (1.05x normal, 1.10x featured)
- Button arrow animation khi hover
- Pulse animation cho "PHỔ BIẾN NHẤT" badge

#### Responsive Design
- Grid layout: 1 col mobile, 2 cols tablet, 3 cols desktop
- Featured card scale chỉ áp dụng trên lg screens
- Flexible spacing và padding

### 5. Features Section
Thêm features comparison section với:
- Delivery time: 24h
- Accuracy: 95%
- Happy customers: 10,000+

### 6. Structure
```
src/components/features/pricing/
├── Pricing.astro          # Main pricing section
├── PricingCard.tsx        # Card component (React)
├── PricingToggle.tsx      # Toggle component (React)
└── index.ts              # Exports
```

## Technical Details

### Dependencies
- `lucide-react`: Icons (Check, Sparkles)
- `class-variance-authority`: Variant handling
- `@radix-ui/react-slot`: Button composition

### Integration
- Cards sử dụng `client:load` directive trong Astro
- Compatible với existing ScrollReveal system
- Maintains existing package selection logic

### Color Scheme
```css
/* Light Mode */
--primary: 262.1 83.3% 57.8% (Purple)
--background: 0 0% 100% (White)
--card: 0 0% 100% (White)

/* Dark Mode */
--primary: 263.4 70% 50.4% (Purple)
--background: 222.2 84% 4.9% (Dark Blue)
--card: 222.2 84% 4.9% (Dark Blue)
```

### Highlighted Cards
- Yellow/Orange gradient (from-yellow-500 to-orange-500)
- 2px border with yellow-500
- Shadow with yellow-500/20 opacity
- Scale 1.05x on desktop, 1.10x on hover
- Pulse animation on badge

## Browser Support
- Modern browsers with CSS custom properties support
- Fallbacks for older browsers through Tailwind
- Responsive across all device sizes

## Future Enhancements
1. Implement yearly pricing toggle
2. Add comparison table below cards
3. Add testimonials per pricing tier
4. Implement "Most Popular" animation on scroll into view
5. Add loading states for async package data

## Performance
- Components lazy loaded with `client:load`
- CSS-in-JS avoided, using Tailwind classes
- Optimized animations with GPU acceleration (transform, opacity)
- No runtime theme switching overhead

## Accessibility
- Semantic HTML structure
- ARIA labels for toggle switch
- Keyboard navigation support
- Focus states for interactive elements
- Color contrast meets WCAG AA standards

## Notes
- Giữ nguyên logic selection từ version cũ
- Tương thích với existing analytics tracking
- Không breaking changes với fallback data

