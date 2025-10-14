/**
 * Fallback Data
 * Static data for packages and testimonials
 */

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  features: string[];
  is_featured: boolean;
  is_popular: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  review: string;
  rating: number;
  is_verified: boolean;
  created_at: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount_percent: number;
  deadline_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ===========================
// Fallback Packages
// ===========================
export const FALLBACK_PACKAGES: Package[] = [
  {
    id: 'package-1',
    name: 'Tử Vi Trọn Đời',
    description: 'Xem từng Đại Vận trọn đời chi tiết',
    price: 599000,
    original_price: null,
    features: [
      'Phân tích toàn bộ 12 Đại Vận trọn đời',
      'Luận giải chi tiết từng giai đoạn',
      'Tư vấn về tình duyên, sự nghiệp, tài lộc',
      'Hỗ trợ tư vấn qua chat',
    ],
    is_featured: true,
    is_popular: true,
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'package-2',
    name: 'Luận Tổng Quát',
    description: 'Xem Đại Vận 10 năm (Tình duyên - Công việc - Tài chính)',
    price: 299000,
    original_price: null,
    features: [
      'Phân tích Đại Vận 10 năm tới',
      'Tư vấn Tình duyên chi tiết',
      'Tư vấn Công việc và sự nghiệp',
      'Tư vấn Tài chính và đầu tư',
    ],
    is_featured: false,
    is_popular: false,
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'package-3',
    name: 'Bát Tự Trọn Đời',
    description: 'Nhận biết Quý Nhân của bản mệnh là ai + Dùng thuật phong thuỷ để Chiêu Tài',
    price: 499000,
    original_price: 699000,
    features: [
      'Nhận biết Quý Nhân của bản mệnh',
      'Phân tích Bát Tự trọn đời chi tiết',
      'Thuật phong thủy để Chiêu Tài',
      'Hướng dẫn phong thủy thực tế',
    ],
    is_featured: true,
    is_popular: true,
    order_index: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'package-4',
    name: 'Tình Duyên',
    description: 'Luận Tuổi hợp dựa trên Tử Vi/Bát tự - Xem năm cưới',
    price: 199000,
    original_price: null,
    features: [
      'Luận tuổi hợp dựa trên Tử Vi',
      'Phân tích Bát Tự tương hợp',
      'Dự đoán năm cưới và hôn nhân',
      'Tư vấn về tình cảm và hôn nhân',
    ],
    is_featured: false,
    is_popular: false,
    order_index: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'package-5',
    name: 'Bản Đồ Sao - Chiêm Tinh',
    description: '2 lá số của Quý khách và Người thương',
    price: 399000,
    original_price: 499000,
    features: [
      'Lá số chiêm tinh của Quý khách',
      'Lá số chiêm tinh người thương',
      'Phân tích tương hợp chiêm tinh',
      'So sánh tính cách và tương lai',
    ],
    is_featured: false,
    is_popular: false,
    order_index: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'package-6',
    name: 'Gieo Quẻ Kinh Dịch',
    description: 'Gieo quẻ và luận giải Kinh Dịch',
    price: 199000,
    original_price: 250000,
    features: [
      'Gieo quẻ Kinh Dịch chính xác',
      'Luận giải quẻ theo thời gian',
      'Tư vấn hướng đi phù hợp',
      'Hướng dẫn gieo quẻ tại nhà',
    ],
    is_featured: false,
    is_popular: false,
    order_index: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// ===========================
// Fallback Testimonials
// ===========================
export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    customer_name: 'Nguyễn Văn Minh',
    review: 'Dịch vụ tử vi rất chi tiết và chính xác. Tôi rất hài lòng!',
    rating: 5,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testimonial-2',
    customer_name: 'Trần Thị Thu',
    review: 'Luận giải rất tâm huyết, những dự đoán về sự nghiệp của tôi đã đúng. Cảm ơn Trúc Nghi!',
    rating: 5,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testimonial-3',
    customer_name: 'Lê Hoàng Nam',
    review: 'Tôi đã thử nhiều dịch vụ khác nhưng Trúc Nghi là tốt nhất. Giá cả hợp lý, chất lượng vượt mong đợi.',
    rating: 5,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testimonial-4',
    customer_name: 'Phạm Mai Anh',
    review: 'Báo cáo tử vi rất chi tiết, giúp tôi hiểu rõ hơn về bản thân và định hướng tương lai.',
    rating: 4,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testimonial-5',
    customer_name: 'Võ Đức Thắng',
    review: 'Dịch vụ chuyên nghiệp, nội dung luận giải rất sâu sắc và hữu ích.',
    rating: 5,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testimonial-6',
    customer_name: 'Đặng Thị Hoa',
    review: 'Phần tư vấn tình duyên rất chính xác, giúp tôi hiểu được người phù hợp với mình.',
    rating: 5,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testimonial-7',
    customer_name: 'Hoàng Văn Bình',
    review: 'Tôi đã đặt gói Tử Vi Trọn Đời và rất hài lòng. Các thông tin rất chi tiết và dễ hiểu.',
    rating: 5,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testimonial-8',
    customer_name: 'Ngô Thị Lan',
    review: 'Dịch vụ tuyệt vời! Nội dung phong phú. Sẽ giới thiệu cho bạn bè.',
    rating: 5,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testimonial-9',
    customer_name: 'Bùi Văn Toàn',
    review: 'Luận giải chi tiết, giúp tôi có cái nhìn rõ ràng hơn về vận mệnh của mình.',
    rating: 4,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testimonial-10',
    customer_name: 'Đinh Mai Phương',
    review: 'Rất chuyên nghiệp, hỗ trợ tư vấn nhiệt tình. Tôi rất tin tưởng dịch vụ này.',
    rating: 5,
    is_verified: true,
    created_at: new Date().toISOString(),
  },
];

// ===========================
// Fallback Promotions
// ===========================
export const FALLBACK_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Ưu Đãi Đặc Biệt',
    description: 'Giảm giá 25% cho tất cả gói luận giải',
    discount_percent: 25,
    deadline_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
