# Registration Components

Multi-step registration form components for package purchase flow.

## Components

### RegistrationForm
Main form component with 4-step wizard:
1. Package confirmation
2. Contact information (name, phone, email)
3. Birth information (date, time, gender)
4. Additional info & confirmation

**Usage:**
```tsx
<RegistrationForm 
  client:load 
  packageInfo={{
    id: "package-1",
    name: "Tử Vi Trọn Đời",
    price: 599000,
    features: [...]
  }} 
/>
```

### StepIndicator
Progress indicator for multi-step form.

**Usage:**
```tsx
<StepIndicator steps={FORM_STEPS} currentStep={2} />
```

### PackageInfoCard
Display selected package information.

**Usage:**
```tsx
<PackageInfoCard packageInfo={packageInfo} />
```

## Flow

1. User clicks "Chọn gói này" → Redirects to `/register?packageId=...&packageName=...&price=...`
2. Form collects user data through 4 steps with validation
3. On submit:
   - Save to Google Sheets via Apps Script
   - Create PayOS payment link
   - Redirect to PayOS checkout
4. After payment:
   - Success → `/payment-success`
   - Cancel → `/payment-cancel`

## Type Definitions

See `src/types/registration.ts` for all types and constants.

## Documentation

- Full feature documentation: `docs/REGISTRATION_FEATURE.md`
- Google Sheets setup: `docs/GOOGLE_APPS_SCRIPT.md`
- Environment setup: `docs/ENVIRONMENT_SETUP.md`

