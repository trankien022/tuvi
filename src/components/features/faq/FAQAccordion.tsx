import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@ui/accordion.tsx';
import { 
  Sparkles, 
  Info, 
  Clock, 
  FileText, 
  CreditCard, 
  Shield, 
  MessageCircle, 
  Package 
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string[];
  icon: any;
}

const faqData: FAQItem[] = [
  {
    id: 'item-1',
    question: 'Luận giải Tử Vi là gì?',
    icon: Sparkles,
    answer: [
      'Luận giải Tử Vi là phương pháp phân tích vận mệnh dựa trên ngày giờ sinh của bạn. Chúng tôi sẽ xây dựng Lá Số Tử Vi và phân tích chi tiết về tính cách, sự nghiệp, tài lộc, tình cảm, sức khỏe và các giai đoạn vận hạn trong cuộc đời.',
      'Báo cáo của chúng tôi được soạn thảo bởi chuyên gia có nhiều năm kinh nghiệm, giúp bạn hiểu rõ bản thân và đưa ra những quyết định đúng đắn trong cuộc sống.',
    ],
  },
  {
    id: 'item-2',
    question: 'Tôi cần cung cấp những thông tin gì?',
    icon: Info,
    answer: [
      'Để có một lá số chính xác, bạn cần cung cấp:',
      '• Ngày sinh (ngày, tháng, năm)',
      '• Giờ sinh (càng chính xác càng tốt)',
      '• Giới tính',
      '• Nơi sinh (tỉnh/thành phố)',
      'Giờ sinh là yếu tố quan trọng nhất. Nếu không nhớ rõ giờ sinh, vui lòng hỏi người thân hoặc chúng tôi có thể hỗ trợ xác định giờ sinh dựa trên các sự kiện đã xảy ra.',
    ],
  },
  {
    id: 'item-3',
    question: 'Mất bao lâu để nhận được báo cáo?',
    icon: Clock,
    answer: [
      'Sau khi bạn hoàn tất thanh toán và cung cấp đầy đủ thông tin, chúng tôi sẽ gửi báo cáo luận giải Tử Vi chi tiết đến email của bạn trong vòng 24 giờ.',
      'Trong trường hợp đặc biệt hoặc các gói dịch vụ phức tạp, thời gian có thể kéo dài đến 48 giờ. Chúng tôi luôn cố gắng giao báo cáo sớm nhất có thể.',
    ],
  },
  {
    id: 'item-4',
    question: 'Báo cáo có những nội dung gì?',
    icon: FileText,
    answer: [
      'Báo cáo Tử Vi của chúng tôi bao gồm:',
      '• Phân tích Lá Số Tử Vi chi tiết',
      '• Tính cách, ưu nhược điểm bản thân',
      '• Vận hạn theo từng giai đoạn (Đại Vận, Tiểu Vận)',
      '• Phân tích về tài lộc, quan lộc, sự nghiệp',
      '• Tình cảm, hôn nhân, gia đạo',
      '• Sức khỏe và những điều cần lưu ý',
      '• Lời khuyên và hướng dẫn cụ thể cho từng giai đoạn',
      'Tất cả được trình bày dưới dạng file PDF dễ đọc, dễ lưu trữ.',
    ],
  },
  {
    id: 'item-5',
    question: 'Tôi có thể thanh toán bằng cách nào?',
    icon: CreditCard,
    answer: [
      'Chúng tôi chấp nhận nhiều hình thức thanh toán:',
      '• Chuyển khoản ngân hàng (Vietcombank, BIDV, Techcombank...)',
      '• Ví điện tử (MoMo, ZaloPay, VNPay)',
      '• Quét mã QR thanh toán nhanh',
      'Sau khi thanh toán, vui lòng gửi ảnh chụp màn hình xác nhận chuyển khoản cùng với thông tin sinh của bạn qua email hoặc Telegram để chúng tôi xử lý nhanh nhất.',
    ],
  },
  {
    id: 'item-6',
    question: 'Thông tin của tôi có được bảo mật không?',
    icon: Shield,
    answer: [
      'Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân và dữ liệu ngày giờ sinh của bạn. Mọi thông tin chỉ được sử dụng cho mục đích luận giải Tử Vi và không chia sẻ cho bất kỳ bên thứ ba nào.',
      'Tất cả dữ liệu được mã hóa và lưu trữ an toàn theo tiêu chuẩn bảo mật cao nhất.',
    ],
  },
  {
    id: 'item-7',
    question: 'Tôi có thể hỏi thêm sau khi nhận báo cáo không?',
    icon: MessageCircle,
    answer: [
      'Tất nhiên! Sau khi nhận báo cáo, nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua:',
      '• Email: contact@trucnghi.com',
      '• Telegram: @trucnghi',
      '• Hotline: 0901.234.567',
      'Chúng tôi sẽ giải đáp miễn phí các câu hỏi liên quan đến báo cáo của bạn trong vòng 7 ngày kể từ khi giao báo cáo.',
    ],
  },
  {
    id: 'item-8',
    question: 'Sự khác biệt giữa các gói dịch vụ?',
    icon: Package,
    answer: [
      'Gói Luận Tổng Quát (299.000đ):',
      '• Phân tích Đại Vận 10 năm tới',
      '• Tập trung vào vận hạn hiện tại',
      '• Phù hợp cho người muốn biết xu hướng ngắn hạn',
      '',
      'Gói Tử Vi Trọn Đời (599.000đ):',
      '• Phân tích 12 Đại Vận trọn đời (khoảng 120 năm)',
      '• Chi tiết về từng giai đoạn cuộc đời',
      '• Phù hợp cho người muốn hiểu sâu về vận mệnh cả đời',
      '',
      'Cả hai gói đều bao gồm phân tích chi tiết về tài lộc, sự nghiệp, tình cảm, sức khỏe.',
    ],
  },
];

export default function FAQAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-4"
      defaultValue="item-1"
    >
      {faqData.map((faq) => {
        const Icon = faq.icon;
        return (
          <AccordionItem 
            key={faq.id} 
            value={faq.id}
            className="border rounded-2xl bg-white dark:bg-slate-900/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden backdrop-blur-sm border-slate-200 dark:border-slate-800"
          >
            <AccordionTrigger className="text-left hover:no-underline px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-start gap-4 w-full">
                <div className="mt-0.5 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 pr-4">
                  {faq.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="ml-14 space-y-3 text-slate-600 dark:text-slate-400">
                {faq.answer.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed text-sm md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
