import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
const isProd = process.env.NODE_ENV === 'production'
const settings = require('./config/settings.json')

async function generateRoutes() {
  const { $content } = require('@nuxt/content')
  const files = await $content({ deep: true }).only(['path', 'alias']).fetch()

  const routes = files.map((file) => (file.path === '/index' ? '/' : file.path))

  return routes
}

export default {
  telemetry: false,
  // pageTransition: {
  //   name: 'fade',
  //   mode: 'fade'
  // },
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
    title: settings.siteName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/store-init.js' },
    { src: '~/plugins/vue-awesome-swiper', mode: 'client' },
    // '~/plugins/components.js',
    // '~/plugins/components.js',
    // '~/plugins/preview.client.js'
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
    '@nuxtjs/sitemap',
    // [
    //   'storyblok-nuxt',
    //   {
    //     accessToken: process.env.STORYBLOK_KEY,
    //     cacheProvider: 'memory'
    //   }
    // ],
  ],
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    liveEdit: false,
    markdown: {
      remarkPlugins: ['~/plugins/remark-responsive-images.js'],
    },
  },
  /**
   * See https://storybook.nuxtjs.org/options/
   */
  // storybook: {
  //   // Options
  //   stories: [
  //     '~/components/**/*.stories.js',
  //     '~/components/**/*.stories.mdx'
  //   ],
  //   addons: [
  //     '@storybook/addon-knobs',
  //     '@storybook/addon-viewport',
  //     '@storybook/addon-docs'
  //   ],
  //   parameters: {
  //     viewport: {
  //       viewports: MINIMAL_VIEWPORTS,
  //     },
  //   }
  // },
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
    },
  },
  generate: {
    fallback: true,
    async routes() {
      return generateRoutes()
    },
    /* hooks: {
      'content:file:beforeParse': (file) => {
        if (file.extension !== '.md') return
        file.data = file.data.replace(/react/g, 'vue')
      }
    } */
  },
  router: {
    linkActiveClass: 'link-parent-active',
    linkExactActiveClass: 'link-active',
  },
  sitemap: {
    hostname: settings.urls[process.env.NODE_ENV],
    gzip: true,
    routes: async () => await generateRoutes(),
  },
  /* More information on the PWA module: https://pwa.nuxtjs.org/ */
  pwa: {
    workbox: {
      enabled: true,
      autoRegister: true,
      offline: false,
    },
    manifest: {
      name: settings.siteName,
      short_name: 'GSR e.V.',
      description:
        'Grenzen sind relativ e.V. - Kultur, Gesellschaft & Inklusion "Grenzen sind relativ e.V." setzt sich mit verschiedensten Projekten, Veranstaltungen und Kampagnen für eine inklusive, integrale und nachhaltige Gesellschaft ein. Das Pilotprojekt Мusikunterricht für Hörgeschädigte wurde bereits mehrfach ausgezeichnet.',
      theme_color: '#fff',
      appleStatusBarStyle: 'white',
      ogImage: '/media/gsr-fb-banner_2018-1.jpg',
    },
  },
}
