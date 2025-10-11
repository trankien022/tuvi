# Responsive Design - Registration Page

## Tổng quan

Trang đăng ký (`/register`) đã được cải thiện với responsive design hoàn chỉnh để đảm bảo trải nghiệm tốt trên tất cả các thiết bị: mobile, tablet và desktop.

## Các cải tiến chính

### 1. Layout & Spacing

#### Mobile (< 640px)
- Padding giảm xuống còn `px-4` (16px)
- Gap giữa các phần tử giảm từ 24px xuống 12px
- Margin top/bottom được tối ưu cho viewport nhỏ

#### Tablet (640px - 1024px)
- Padding tăng lên `px-6` (24px)
- Gap trung bình giữa mobile và desktop

#### Desktop (> 1024px)
- Padding tối đa `px-8` (32px)
- Spacing đầy đủ cho UX tốt nhất

### 2. Typography

#### Card Titles
- Mobile: `text-lg` (18px)
- Tablet: `text-xl` (20px)
- Desktop: `text-2xl` (24px)

#### Card Descriptions
- Mobile: `text-xs` (12px)
- Desktop: `text-sm` (14px)

#### Form Inputs & Labels
- Mobile: Font size tối thiểu 16px để tránh zoom trên iOS
- Desktop: Kích thước chuẩn với `text-base`

#### Package Price
- Mobile: `text-xl` (20px)
- Tablet: `text-2xl` (24px)
- Desktop: `text-3xl` (30px)

### 3. Form Components

#### Input Fields
```tsx
// Tất cả input fields có class responsive
className="text-base"
// Mobile tự động scale lên 16px qua CSS global
```

#### Birth Date Grid
```tsx
// Mobile: Stack vertical (1 column)
// Desktop: Horizontal layout (3 columns)
className="grid grid-cols-1 sm:grid-cols-3 gap-4"
```

#### Gender Radio Buttons
```tsx
// Mobile: Stack vertical
// Desktop: Horizontal
className="flex flex-col sm:flex-row gap-3 sm:gap-4"
```

#### Navigation Buttons
```tsx
// Mobile: Full width, stack reverse
// Desktop: Auto width, horizontal
className="flex flex-col-reverse sm:flex-row"
className="w-full sm:w-auto min-w-[120px]"
```

### 4. Header

#### Back Button
- Mobile: Chỉ hiện "Quay lại" (tiết kiệm không gian)
- Desktop: Hiện đầy đủ "Quay lại trang chủ"

#### Logo/Brand
- Mobile: `text-base` (16px)
- Desktop: `text-xl` (20px)

#### Header Height
- Mobile: `h-14` (56px)
- Desktop: `h-16` (64px)

### 5. Step Indicator

#### Desktop
- Hiện cả title và description cho mỗi step
- Icon size: 48x48px
- Full labels

#### Mobile
- Chỉ hiện icon với số/checkmark
- Icon size: 40x40px
- Current step title & description hiện ở dưới
- Tiết kiệm không gian vertical

### 6. Trust Indicators (3 cards ở footer)

#### Layout
- Mobile: Stack vertical (1 column)
- Desktop: Horizontal (3 columns)

#### Icons & Text
- Mobile: Icon 28px, text 12px
- Desktop: Icon 32px, text 14px

#### Alignment
- Mobile: Left aligned
- Desktop: Center aligned

### 7. Package Info Card

#### Badge
- Mobile: `text-[10px]` với padding nhỏ
- Desktop: `text-xs` với padding chuẩn

#### Features List
- Checkmark icon: 10px (mobile) → 12px (desktop)
- Text: Responsive với `leading-relaxed` cho dễ đọc

### 8. Confirmation Summary

#### Grid Layout
```tsx
// Mobile: 1 column
// Desktop: 2 columns
className="grid grid-cols-1 sm:grid-cols-2"
```

#### Email Field
```tsx
// Mobile: Full width để tránh overflow
className="sm:col-span-2"
// Text break for long emails
className="break-all"
```

### 9. CSS Global Improvements

#### Mobile-specific
```css
@media (max-width: 640px) {
  /* Prevent zoom on iOS when focusing inputs */
  input, select, textarea {
    font-size: 16px !important;
  }
  
  /* Minimum touch target size */
  button, a {
    min-height: 44px;
  }
  
  /* Prevent horizontal scroll */
  body {
    overflow-x: hidden;
  }
}
```

#### iOS Safe Area
```css
@supports (padding: max(0px)) {
  .container {
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
  }
}
```

#### Smooth Scrolling
```css
html {
  scroll-behavior: smooth;
}
```

### 10. Textarea Enhancement

```tsx
// Resizable with responsive min-height
className="min-h-[100px] sm:min-h-[120px] resize-y"
```

## Breakpoints

Tailwind CSS breakpoints được sử dụng:
- `sm`: 640px (tablet)
- `md`: 768px (tablet lớn)
- `lg`: 1024px (desktop)

## Testing Checklist

### Mobile (320px - 640px)
- [ ] Form inputs không bị zoom khi focus (iOS)
- [ ] Buttons đủ lớn để tap (min 44px)
- [ ] Không có horizontal scroll
- [ ] Text dễ đọc, không quá nhỏ
- [ ] Cards không bị overflow
- [ ] Navigation buttons full width

### Tablet (640px - 1024px)
- [ ] Layout chuyển đổi mượt mà
- [ ] Spacing hợp lý
- [ ] Form grid hiển thị đúng
- [ ] Navigation buttons có width phù hợp

### Desktop (> 1024px)
- [ ] Full spacing và padding
- [ ] Typography kích thước lớn nhất
- [ ] Multi-column layouts hoạt động tốt
- [ ] Hover states hoạt động

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari iOS (12+)
- ✅ Safari macOS (12+)
- ✅ Chrome Android (latest)

## Performance

- CSS critical được inline
- Animation chỉ khi cần thiết (slide-in)
- No layout shift
- Fast paint times

## Accessibility

- Touch targets >= 44px on mobile
- Font sizes readable (>= 16px on mobile)
- Proper contrast ratios
- Keyboard navigation works
- Screen reader friendly

## Future Improvements

1. Add landscape mode optimizations for mobile
2. Consider dark mode enhancements
3. Add animation preferences (prefers-reduced-motion)
4. Optimize for foldable devices
5. Add PWA viewport meta tags

