import React from 'react';

interface ReviewCardProps {
  customerName: string;
  review: string;
  rating: number;
  isVerified: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ customerName, review, rating, isVerified }) => {
  return (
    <div className="relative w-80 mx-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Rating stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        {isVerified && (
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
            ✓ Đã xác thực
          </span>
        )}
      </div>

      {/* Review text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">{review}</p>

      {/* Customer info */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          {customerName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{customerName}</p>
          <p className="text-xs text-gray-500">Khách hàng đã mua</p>
        </div>
      </div>
    </div>
  );
};

