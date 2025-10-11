import { defineConfig, defaultExclude } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/e2e/', '**/*.d.ts', '**/*.config.*', 'dist/'],
    },
    include: ['src/test/components/**/*.test.{js,ts,jsx,tsx}'],
    exclude: [...defaultExclude, 'src/test/e2e/**'],
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
});
