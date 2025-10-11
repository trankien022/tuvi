import type { Package, Testimonial } from '../../types';

export interface StructuredDataConfig {
  siteName: string;
  siteUrl: string;
  organizationName: string;
  logo: string;
  contactInfo: {
    telephone: string;
    email: string;
    address?: string;
  };
  socialMedia: string[];
}

export function generateOrganizationSchema(config: StructuredDataConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${config.siteUrl}/#organization`,
    name: config.organizationName,
    url: config.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: config.logo,
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: config.contactInfo.telephone,
      email: config.contactInfo.email,
      contactType: 'customer service',
      availableLanguage: ['Vietnamese', 'English'],
      areaServed: 'VN',
    },
    sameAs: config.socialMedia,
    foundingDate: '2024',
    description: 'Dịch vụ luận giải tử vi, bát tự chuyên nghiệp với độ chính xác cao',
  };
}

export function generateServiceSchema(config: StructuredDataConfig, packages: Package[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${config.siteUrl}/#service`,
    name: 'Luận giải Tử Vi chuyên nghiệp',
    description: 'Dịch vụ luận giải tử vi, bát tự chuyên nghiệp với độ chính xác cao, giao PDF trong 24 giờ',
    provider: {
      '@id': `${config.siteUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Vietnam',
    },
    serviceType: 'Fortune Telling',
    category: 'Astrology Services',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Gói luận giải tử vi',
      itemListElement: packages.map((pkg, _index) => ({
        '@type': 'Offer',
        '@id': `${config.siteUrl}/package/${pkg.id}`,
        itemOffered: {
          '@type': 'Service',
          name: pkg.name,
          description: pkg.description,
          category: 'Astrology Reading',
        },
        price: pkg.price,
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        validFrom: new Date().toISOString(),
        seller: {
          '@id': `${config.siteUrl}/#organization`,
        },
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function generateWebsiteSchema(config: StructuredDataConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${config.siteUrl}/#website`,
    url: config.siteUrl,
    name: config.siteName,
    description: 'Luận giải Tử Vi chuyên nghiệp - Biết vận hạn, nắm cơ hội, tránh rủi ro',
    publisher: {
      '@id': `${config.siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['vi-VN', 'en-US'],
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateReviewSchema(testimonials: Testimonial[], config: StructuredDataConfig) {
  return testimonials.map((testimonial) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: 'Luận giải Tử Vi',
      provider: {
        '@id': `${config.siteUrl}/#organization`,
      },
    },
    author: {
      '@type': 'Person',
      name: testimonial.customer_name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: testimonial.review,
    datePublished: testimonial.created_at,
    publisher: {
      '@id': `${config.siteUrl}/#organization`,
    },
  }));
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function generateProductSchema(pkg: Package, config: StructuredDataConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${config.siteUrl}/package/${pkg.id}`,
    name: pkg.name,
    description: pkg.description,
    category: 'Astrology Services',
    brand: {
      '@id': `${config.siteUrl}/#organization`,
    },
    offers: {
      '@type': 'Offer',
      price: pkg.price,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      seller: {
        '@id': `${config.siteUrl}/#organization`,
      },
      validFrom: new Date().toISOString(),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

// Helper function to combine all schemas for the homepage
export function generateHomepageStructuredData(
  config: StructuredDataConfig,
  packages: Package[],
  testimonials: Testimonial[],
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateOrganizationSchema(config),
      generateServiceSchema(config, packages),
      generateWebsiteSchema(config),
      generateFAQSchema(faqs),
      ...generateReviewSchema(testimonials.slice(0, 5), config), // Limit to top 5 reviews
    ],
  };
}
