/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      spacing: {
        '16/9': '56.25%'
      }
    }
  },
  variants: {
    textDecoration: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    width: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    height: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    zIndex: ['hover']
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
