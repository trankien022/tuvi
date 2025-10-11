import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      'dist',
      'node_modules',
      '.github',
      'types.generated.d.ts',
      '.astro',
      'public/decapcms/config.yml'
    ],
  },

  // JS files
  js.configs.recommended,

  // TS files
  ...tseslint.configs.recommended,

  // Astro files
  {
    files: ['**/*.astro'],
    plugins: {
      astro,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...astro.environments.astro.globals,
      },
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...astro.configs.recommended.rules,
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    },
  },

  // General rules
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // CJS files
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    }
  },
);
