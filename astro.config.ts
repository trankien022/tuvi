import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// Load .env file into process.env
config();

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import type { AstroIntegration } from 'astro';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/lib/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://trucnghi.vercel.app',
  output: 'server',
  adapter: vercel({
    functionPerRoute: false,
  }),

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        // Core aliases
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@ui': path.resolve(__dirname, './src/components/ui'),
        '@features': path.resolve(__dirname, './src/components/features'),
        '@layouts': path.resolve(__dirname, './src/components/layouts'),
        '@common': path.resolve(__dirname, './src/components/common'),
        
        // Logic aliases
        '@lib': path.resolve(__dirname, './src/lib'),
        '@utils': path.resolve(__dirname, './src/lib/utils'),
        '@hooks': path.resolve(__dirname, './src/lib/hooks'),
        '@db': path.resolve(__dirname, './src/lib/db'),
        '@security': path.resolve(__dirname, './src/lib/security'),
        '@seo': path.resolve(__dirname, './src/lib/seo'),
        
        // Config & Types
        '@config': path.resolve(__dirname, './src/config'),
        '@types': path.resolve(__dirname, './src/types'),
        
        // Assets
        '@assets': path.resolve(__dirname, './src/assets'),
        '@images': path.resolve(__dirname, './src/assets/images'),
        '@styles': path.resolve(__dirname, './src/assets/styles'),
        
        // Pages & Sections
        '@pages': path.resolve(__dirname, './src/pages'),
        '@sections': path.resolve(__dirname, './src/sections'),
        
        // Keep legacy alias
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
