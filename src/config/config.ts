/**
 * Configuration module
 * This replaces the virtual module 'astrowind:config'
 */

// Default site configuration
export const SITE = {
  name: 'Tử Vi Trúc Nghi',
  site: 'https://trucnghi.vercel.app',
  base: '/',
  trailingSlash: false,
  googleSiteVerificationId: 'orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M',
} as const;

// Default metadata
export const METADATA = {
  title: {
    default: 'Tử Vi Trúc Nghi – Luận giải Tử Vi/Bát Tự',
    template: '%s — Tử Vi Trúc Nghi',
  },
  description: 'Luận giải Tử Vi chuyên nghiệp - Biết vận hạn, nắm cơ hội, tránh rủi ro. Tư vấn tài lộc, quan lộc, tình cảm, sức khỏe.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    site_name: 'Tử Vi Trúc Nghi',
    images: [
      {
        url: '~/assets/images/trucnghi-og.png',
        width: 1200,
        height: 628,
      },
    ],
    type: 'website',
  },
  twitter: {
    handle: '@trucnghi',
    site: '@trucnghi',
    cardType: 'summary_large_image',
  },
} as const;

// Internationalization
export const I18N = {
  language: 'vi',
  textDirection: 'ltr',
} as const;

// Blog configuration
export const APP_BLOG = {
  isEnabled: true,
  postsPerPage: 6,
  post: {
    isEnabled: true,
    permalink: '/%slug%',
    robots: {
      index: true,
    },
  },
  list: {
    isEnabled: true,
    pathname: 'blog',
    robots: {
      index: true,
    },
  },
  category: {
    isEnabled: true,
    pathname: 'category',
    robots: {
      index: true,
    },
  },
  tag: {
    isEnabled: true,
    pathname: 'tag',
    robots: {
      index: false,
    },
  },
  isRelatedPostsEnabled: true,
  relatedPostsCount: 4,
} as const;

// Analytics configuration
export const ANALYTICS = {
  vendors: {
    googleAnalytics: {
      id: null,
    },
  },
} as const;

// UI configuration
export const UI = {
  theme: 'system' as const, // Values: "system" | "light" | "dark" | "light:only" | "dark:only"
} as const;

