/**
 * Registration Form Types
 * Type definitions for registration flow and PayOS integration
 */

export interface PackageInfo {
  id: string;
  name: string;
  price: number;
  features?: string[];
}

export interface RegistrationFormData {
  // Step 1: Package info (from URL params)
  packageId: string;
  packageName: string;
  price: number;

  // Step 2: Contact information
  fullName: string;
  phone: string;
  email: string;

  // Step 3: Birth information
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  birthHour: string;
  gender: 'Nam' | 'Nữ' | '';

  // Step 4: Additional information
  address: string;
  specialQuestion: string;
}

export interface GoogleSheetsData {
  fullName: string;
  phone: string;
  email: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  birthHour: string;
  gender: string;
  address: string;
  specialQuestion: string;
  packageName: string;
  price: string;
  orderCode: string;
}

export interface GoogleSheetsResponse {
  success: boolean;
  message: string;
  timestamp?: string;
}

export interface PaymentStatusCheckRequest {
  orderCode: string;
}

export interface PaymentStatusCheckResponse {
  success: boolean;
  orderCode: string;
  status: 'paid' | 'pending' | 'cancelled' | 'expired';
  isPaid: boolean;
  paymentInfo?: {
    status: string;
    amount: number;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
  error?: string;
}

export interface PaymentStatusUpdateRequest {
  orderCode: string;
  paymentStatus: string;
  paymentInfo?: any;
  registrationData?: any;
}

export interface PaymentStatusUpdateResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface PayOSWebhookData {
  type: string;
  data: {
    orderCode: string;
    status: string;
    amount?: number;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface PayOSWebhookResponse {
  success: boolean;
  message: string;
  orderCode?: string;
  status?: string;
  error?: string;
}

export interface PayOSCreatePaymentLinkRequest {
  orderCode: number;
  amount: number;
  description: string;
  returnUrl: string;
  cancelUrl: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface PayOSCreatePaymentLinkResponse {
  success: boolean;
  checkoutUrl?: string;
  message?: string;
  error?: string;
  details?: string;
  orderCode?: number;
}

export type FormStep = 1 | 2 | 3 | 4;

export interface StepConfig {
  step: FormStep;
  title: string;
  description: string;
}

export const FORM_STEPS: StepConfig[] = [
  {
    step: 1,
    title: 'Thông tin gói',
    description: 'Xác nhận gói dịch vụ',
  },
  {
    step: 2,
    title: 'Thông tin liên hệ',
    description: 'Để chúng tôi liên hệ với bạn',
  },
  {
    step: 3,
    title: 'Thông tin sinh',
    description: 'Để luận giải chính xác',
  },
  {
    step: 4,
    title: 'Xác nhận',
    description: 'Kiểm tra và thanh toán',
  },
];

// Gender options
export const GENDER_OPTIONS = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
] as const;

// Birth hour options (giờ sinh theo 12 giờ địa chi)
export const BIRTH_HOUR_OPTIONS = [
  { value: '23:00-01:00 (Tý)', label: '23:00-01:00 (Tý)' },
  { value: '01:00-03:00 (Sửu)', label: '01:00-03:00 (Sửu)' },
  { value: '03:00-05:00 (Dần)', label: '03:00-05:00 (Dần)' },
  { value: '05:00-07:00 (Mão)', label: '05:00-07:00 (Mão)' },
  { value: '07:00-09:00 (Thìn)', label: '07:00-09:00 (Thìn)' },
  { value: '09:00-11:00 (Tỵ)', label: '09:00-11:00 (Tỵ)' },
  { value: '11:00-13:00 (Ngọ)', label: '11:00-13:00 (Ngọ)' },
  { value: '13:00-15:00 (Mùi)', label: '13:00-15:00 (Mùi)' },
  { value: '15:00-17:00 (Thân)', label: '15:00-17:00 (Thân)' },
  { value: '17:00-19:00 (Dậu)', label: '17:00-19:00 (Dậu)' },
  { value: '19:00-21:00 (Tuất)', label: '19:00-21:00 (Tuất)' },
  { value: '21:00-23:00 (Hợi)', label: '21:00-23:00 (Hợi)' },
  { value: 'Không nhớ', label: 'Không nhớ rõ giờ sinh' },
] as const;

// Month options
export const MONTH_OPTIONS = [
  { value: '1', label: 'Tháng 1' },
  { value: '2', label: 'Tháng 2' },
  { value: '3', label: 'Tháng 3' },
  { value: '4', label: 'Tháng 4' },
  { value: '5', label: 'Tháng 5' },
  { value: '6', label: 'Tháng 6' },
  { value: '7', label: 'Tháng 7' },
  { value: '8', label: 'Tháng 8' },
  { value: '9', label: 'Tháng 9' },
  { value: '10', label: 'Tháng 10' },
  { value: '11', label: 'Tháng 11' },
  { value: '12', label: 'Tháng 12' },
] as const;

