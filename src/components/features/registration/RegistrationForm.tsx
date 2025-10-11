import * as React from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useToast } from '~/hooks/use-toast';
import { StepIndicator } from './StepIndicator';
import { PackageInfoCard } from './PackageInfoCard';
import type {
  RegistrationFormData,
  FormStep,
  PackageInfo,
  GoogleSheetsData,
  GoogleSheetsResponse,
  PayOSCreatePaymentLinkResponse,
} from '~/types/registration';
import {
  FORM_STEPS,
  GENDER_OPTIONS,
  BIRTH_HOUR_OPTIONS,
  MONTH_OPTIONS,
} from '~/types/registration';

interface RegistrationFormProps {
  packageInfo: PackageInfo;
}

export function RegistrationForm({ packageInfo }: RegistrationFormProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = React.useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState<RegistrationFormData>({
    packageId: packageInfo.id,
    packageName: packageInfo.name,
    price: packageInfo.price,
    fullName: '',
    phone: '',
    email: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    birthHour: '',
    gender: '',
    address: '',
    specialQuestion: '',
  });

  const updateFormData = (field: keyof RegistrationFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validation functions
  const validateStep2 = (): boolean => {
    if (!formData.fullName.trim()) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập họ tên',
        variant: 'destructive',
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập số điện thoại',
        variant: 'destructive',
      });
      return false;
    }
    if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      toast({
        title: 'Số điện thoại không hợp lệ',
        description: 'Vui lòng nhập số điện thoại 10-11 chữ số',
        variant: 'destructive',
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập email',
        variant: 'destructive',
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: 'Email không hợp lệ',
        description: 'Vui lòng nhập email đúng định dạng',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.birthDay.trim()) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập ngày sinh',
        variant: 'destructive',
      });
      return false;
    }
    const day = parseInt(formData.birthDay);
    if (day < 1 || day > 31) {
      toast({
        title: 'Ngày sinh không hợp lệ',
        description: 'Vui lòng nhập ngày từ 1-31',
        variant: 'destructive',
      });
      return false;
    }
    if (!formData.birthMonth) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng chọn tháng sinh',
        variant: 'destructive',
      });
      return false;
    }
    if (!formData.birthYear.trim()) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập năm sinh',
        variant: 'destructive',
      });
      return false;
    }
    const year = parseInt(formData.birthYear);
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      toast({
        title: 'Năm sinh không hợp lệ',
        description: `Vui lòng nhập năm từ 1900-${currentYear}`,
        variant: 'destructive',
      });
      return false;
    }
    if (!formData.birthHour) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng chọn giờ sinh',
        variant: 'destructive',
      });
      return false;
    }
    if (!formData.gender) {
      toast({
        title: 'Thiếu thông tin',
        description: 'Vui lòng chọn giới tính',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2() || !validateStep3()) {
      toast({
        title: 'Vui lòng kiểm tra lại thông tin',
        description: 'Có trường thông tin chưa hợp lệ',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate order code
      const orderCode = Date.now();

      // Step 1: Save to Google Sheets
      const sheetsData: GoogleSheetsData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        birthDay: formData.birthDay,
        birthMonth: formData.birthMonth,
        birthYear: formData.birthYear,
        birthHour: formData.birthHour,
        gender: formData.gender,
        address: formData.address,
        specialQuestion: formData.specialQuestion,
        packageName: formData.packageName,
        price: formData.price.toString(),
        orderCode: orderCode.toString(),
      };

      const sheetsResponse = await fetch('/api/save-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetsData),
      });

      if (!sheetsResponse.ok) {
        throw new Error('Lỗi khi lưu thông tin');
      }

      const sheetsResult: GoogleSheetsResponse = await sheetsResponse.json();

      if (!sheetsResult.success) {
        throw new Error(sheetsResult.message || 'Lỗi khi lưu thông tin');
      }

      // Step 2: Create PayOS payment link
      const paymentResponse = await fetch('/api/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderCode,
          amount: formData.price,
          description: `TT don ${orderCode}`, // Max 25 chars - "TT don 1234567890123456"
          buyerName: formData.fullName,
          buyerEmail: formData.email,
          buyerPhone: formData.phone,
          packageName: formData.packageName,
        }),
      });

      // Parse response to get detailed error information
      const paymentResult: PayOSCreatePaymentLinkResponse = await paymentResponse.json();

      // Check HTTP status and response validity
      if (!paymentResponse.ok) {
        const errorMessage = paymentResult.message || paymentResult.error || 'Lỗi khi tạo link thanh toán';
        const errorDetails = paymentResult.details || '';
        console.error('Payment API Error:', {
          status: paymentResponse.status,
          statusText: paymentResponse.statusText,
          message: errorMessage,
          details: errorDetails,
          fullResponse: paymentResult,
        });
        throw new Error(`${errorMessage}${errorDetails ? '\n\nChi tiết: ' + errorDetails : ''}`);
      }

      // Check response data validity
      if (!paymentResult.success || !paymentResult.checkoutUrl) {
        throw new Error(paymentResult.message || 'Lỗi khi tạo link thanh toán');
      }

      // Step 3: Redirect to PayOS checkout
      toast({
        title: 'Đang chuyển đến trang thanh toán',
        description: 'Vui lòng chờ trong giây lát...',
      });

      setTimeout(() => {
        window.location.href = paymentResult.checkoutUrl!;
      }, 1000);
    } catch (error) {
      console.error('Submit error:', error);
      toast({
        title: 'Có lỗi xảy ra',
        description: error instanceof Error ? error.message : 'Vui lòng thử lại sau',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      {/* Step Indicator */}
      <StepIndicator steps={FORM_STEPS} currentStep={currentStep} />

      {/* Form Content */}
      <div className="mt-6 sm:mt-8">
        {/* Step 1: Package Info */}
        {currentStep === 1 && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Xác nhận gói dịch vụ</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Đây là gói dịch vụ bạn đã chọn. Vui lòng xác nhận để tiếp tục.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <PackageInfoCard packageInfo={packageInfo} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Thông tin liên hệ</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Chúng tôi sẽ sử dụng thông tin này để liên hệ và gửi báo cáo cho bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Họ và tên <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    required
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Số điện thoại <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0912345678"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    required
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Birth Information */}
        {currentStep === 3 && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Thông tin sinh</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Thông tin này rất quan trọng để chúng tôi có thể luận giải chính xác
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthDay">
                      Ngày sinh <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="birthDay"
                      type="number"
                      min="1"
                      max="31"
                      placeholder="15"
                      value={formData.birthDay}
                      onChange={(e) => updateFormData('birthDay', e.target.value)}
                      required
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthMonth">
                      Tháng sinh <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.birthMonth} onValueChange={(value) => updateFormData('birthMonth', value)}>
                      <SelectTrigger id="birthMonth" className="text-base">
                        <SelectValue placeholder="Chọn tháng" />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTH_OPTIONS.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthYear">
                      Năm sinh <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="birthYear"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      placeholder="1990"
                      value={formData.birthYear}
                      onChange={(e) => updateFormData('birthYear', e.target.value)}
                      required
                      className="text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthHour">
                    Giờ sinh (Địa chi) <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.birthHour} onValueChange={(value) => updateFormData('birthHour', value)}>
                    <SelectTrigger id="birthHour" className="text-base">
                      <SelectValue placeholder="Chọn giờ sinh" />
                    </SelectTrigger>
                    <SelectContent>
                      {BIRTH_HOUR_OPTIONS.map((hour) => (
                        <SelectItem key={hour.value} value={hour.value}>
                          {hour.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Nếu không nhớ rõ giờ sinh, hãy chọn "Không nhớ rõ giờ sinh"
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>
                    Giới tính <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {GENDER_OPTIONS.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="cursor-pointer text-base">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Additional Information & Confirmation */}
        {currentStep === 4 && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Thông tin bổ sung</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Những thông tin này sẽ giúp chúng tôi tư vấn tốt hơn cho bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ (tùy chọn)</Label>
                  <Input
                    id="address"
                    placeholder="Hà Nội"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialQuestion">Câu hỏi đặc biệt (tùy chọn)</Label>
                  <textarea
                    id="specialQuestion"
                    className="w-full min-h-[100px] sm:min-h-[120px] px-3 py-2 text-sm sm:text-base border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
                    placeholder="Nếu bạn có câu hỏi hoặc nhu cầu tư vấn đặc biệt, hãy cho chúng tôi biết..."
                    value={formData.specialQuestion}
                    onChange={(e) => updateFormData('specialQuestion', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Confirmation Summary */}
            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Xác nhận thông tin</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Vui lòng kiểm tra lại thông tin trước khi thanh toán</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs sm:text-sm">Họ tên:</span>
                    <p className="font-medium text-sm sm:text-base break-words">{formData.fullName}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs sm:text-sm">Số điện thoại:</span>
                    <p className="font-medium text-sm sm:text-base">{formData.phone}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground text-xs sm:text-sm">Email:</span>
                    <p className="font-medium text-sm sm:text-base break-all">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs sm:text-sm">Ngày sinh:</span>
                    <p className="font-medium text-sm sm:text-base">
                      {formData.birthDay}/{formData.birthMonth}/{formData.birthYear}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs sm:text-sm">Giờ sinh:</span>
                    <p className="font-medium text-sm sm:text-base">{formData.birthHour}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs sm:text-sm">Giới tính:</span>
                    <p className="font-medium text-sm sm:text-base">{formData.gender}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <PackageInfoCard packageInfo={packageInfo} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1 || isSubmitting}
          className="w-full sm:w-auto min-w-[120px]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        {currentStep < 4 ? (
          <Button type="button" onClick={handleNext} className="w-full sm:w-auto min-w-[120px]">
            Tiếp tục
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto min-w-[120px]">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                Thanh toán
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  );
}

