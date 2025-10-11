/**
 * Icon Components
 * Centralized SVG icon components for reusability
 */

import React from 'react';

interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
  size?: number;
}

const createIcon = (paths: React.ReactNode) => {
  const Icon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, ...props }) => {
    const sizeClass = size ? `w-${size} h-${size}` : className;
    return (
      <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        {paths}
      </svg>
    );
  };
  return Icon;
};

// User & Profile Icons
export const UserIcon = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </>
);

export const GenderIcon = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </>
);

// Contact Icons
export const EmailIcon = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </>
);

export const PhoneIcon = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </>
);

// Date & Time Icons
export const CalendarIcon = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </>
);

export const ClockIcon = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </>
);

// Location Icon
export const LocationIcon = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </>
);

// Document & Note Icons
export const DocumentIcon = createIcon(
  <>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </>
);

// Status Icons
export const CheckCircleIcon = createIcon(
  <path
    fill="currentColor"
    fillRule="evenodd"
    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    clipRule="evenodd"
  />
);

export const ErrorIcon = createIcon(
  <path
    fill="currentColor"
    fillRule="evenodd"
    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
    clipRule="evenodd"
  />
);

// Security Icons
export const ShieldCheckIcon = createIcon(
  <path
    fill="currentColor"
    fillRule="evenodd"
    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
    clipRule="evenodd"
  />
);

// Shopping Icons
export const ShoppingBagIcon = createIcon(
  <>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </>
);

// Navigation Icons
export const ArrowLeftIcon = createIcon(
  <>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </>
);

export const LightningIcon = createIcon(
  <>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </>
);

// Loading Icon
export const LoadingSpinner: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => {
  return <div className={`${className} animate-spin rounded-full border-b-2 border-current`} />;
};
