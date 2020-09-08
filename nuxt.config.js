import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const isProd = process.env.NODE_ENV === 'production'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/components.js',
    '~/plugins/preview.client.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.STORYBLOK_KEY,
        cacheProvider: 'memory'
      }
    ]
  ],
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},
  /**
   * See https://storybook.nuxtjs.org/options/
   */
  storybook: {
    // Options
    stories: [
      '~/components/**/*.stories.js',
      '~/components/**/*.stories.mdx'
    ],
    addons: [
      '@storybook/addon-knobs',
      '@storybook/addon-viewport',
      '@storybook/addon-docs'
    ],
    parameters: {
      viewport: {
        viewports: MINIMAL_VIEWPORTS,
      },
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    babel: {
      plugins: isProd ? ['transform-remove-console'] : [],
    },
    extend: (config) => {
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/
      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: ['babel-loader', 'vue-svg-loader'],
          },
          {
            loader: 'file-loader',
            query: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ],
      })
    }
  }
}
