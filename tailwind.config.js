/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
export default {
  mode: 'jit',

  theme: {
    extend: {
      minWidth: {
        20: '20rem',
      },
      fontFamily: {
        sans: [
          'Signika',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        serif: [
          'Lora',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
      },
      colors: {
        primary: {
          50: '#F4F8F9',
          100: '#E9F1F3',
          200: '#C8DCE2',
          300: '#A7C6D1',
          400: '#669CAE',
          500: '#24718B',
          600: '#20667D',
          700: '#164453',
          800: '#10333F',
          900: '#0B222A',
        },
        secondary: {
          50: '#F7FCFE',
          100: '#EFF8FD',
          200: '#D8EEF9',
          300: '#C0E4F5',
          400: '#90CFEE',
          500: '#61BBE6',
          600: '#57A8CF',
          700: '#3A708A',
          800: '#2C5468',
          900: '#1D3845',
        },
      },
      spacing: {
        '16/9': '56.25%',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  purge: {
    content: [
      'content/**/*.{md,mdx}',
      'components/**/*.{js,ts,vue}',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.{js,ts}',
      'nuxt.config.{js,ts}',
    ],
  },
}
