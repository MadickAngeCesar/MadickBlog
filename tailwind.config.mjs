import { colors } from './lib/theme.js';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        accent: colors.accent,
        dark: colors.dark,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[900]'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-lead': theme('colors.gray[900]'),
            '--tw-prose-links': theme('colors.primary[600]'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.gray[600]'),
            '--tw-prose-bullets': theme('colors.gray[400]'),
            '--tw-prose-hr': theme('colors.gray[200]'),
            '--tw-prose-quotes': theme('colors.gray[900]'),
            '--tw-prose-quote-borders': theme('colors.primary[500]'),
            '--tw-prose-captions': theme('colors.gray[600]'),
            '--tw-prose-code': theme('colors.primary[600]'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-bg': theme('colors.gray[900]'),
            '--tw-prose-th-borders': theme('colors.gray[300]'),
            '--tw-prose-td-borders': theme('colors.gray[200]'),
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray[200]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray[200]'),
            '--tw-prose-links': theme('colors.primary[300]'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray[400]'),
            '--tw-prose-bullets': theme('colors.gray[600]'),
            '--tw-prose-hr': theme('colors.gray[700]'),
            '--tw-prose-quotes': theme('colors.gray[200]'),
            '--tw-prose-quote-borders': theme('colors.primary[400]'),
            '--tw-prose-captions': theme('colors.gray[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-bg': theme('colors.gray[900]'),
            '--tw-prose-th-borders': theme('colors.gray[600]'),
            '--tw-prose-td-borders': theme('colors.gray[700]'),
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
