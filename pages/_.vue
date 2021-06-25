<template>
  <div class="container mx-auto px-4 md:px-8 pt-6 \\bg-white \\lg:border \\border-b-0 \\border-t-0">
    <!-- <BreadCrumbs v-if="breadCrumbs.length > 1" :bread-crumbs="breadCrumbs" /> -->
    <div class="flex flex-wrap lg:flex-no-wrap lg:flex-col-reverse flex-col">
      <article
        tabindex="-1"
        class="w-full flex lg:justify-end xl:justify-center ml-auto pb-16 outline-none"
      >
        <nuxt-content
          :document="page"
          class="prose w-full break-words hyphens-auto"
          :class="classes"
        />
      </article>
      <div v-if="hasSubMenu">
        <SubMenu
          class="outline-none"
          tabindex="-1"
          :sub-menu="subMenu"
          :parents="subMenu"
          :current-title="currentTitle"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  middleware: 'redirect',
  async asyncData({
    params,
    $content,
    store,
    route,
    error
  }) {
    const path = `/${params.pathMatch || 'index'}`
    const page = await $content(path)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    if (Array.isArray(page)) {
      throw error({ statusCode: 404, message: 'Page not found' })
    }

    let breadCrumbs = store.getters['navigation/breadCrumbs'](route)
    const crumbAnomaly =
      breadCrumbs.length > 1 && breadCrumbs[breadCrumbs.length - 2].children
    const off = crumbAnomaly ? 2 : 1
    const lastCrumb = breadCrumbs[breadCrumbs.length - off]
    const subMenu = lastCrumb ? lastCrumb.siblings : []
    const currentTitle = lastCrumb ? lastCrumb.title : null
    const widePage = !!page.wide

    const { processSlideshow, processVideoGallery } = require('~/lib/processing').default
    const processSlideshows = []
    const processVideoGalleries = []
    page.body.children.forEach((child, i) => {
      if (child.tag === 'slideshow') {
        processSlideshows.push(new Promise((resolve) => {
          resolve(processSlideshow(child.props.name, child.props, $content))
        }))
      } else if (child.tag === 'video-gallery') {
        processVideoGalleries.push(new Promise((resolve) => {
          resolve(processVideoGallery(child.props.name, child.props))
        }))
      }
    })
    await Promise.all(processSlideshows, processVideoGalleries)

    return { page, breadCrumbs, subMenu, currentTitle, widePage }
  },
  head() {
    const settings = require('~/config/settings.json')
    const siteName = settings.title
    const url = settings.urls[process.env.NODE_ENV]

    let title =
      this.page.title === siteName
        ? siteName
        : `${this.page.title} | ${siteName}`
    if (!title) {
      try {
        title = `${this.page.body.children[0].children[1].value} | ${siteName}`
      } catch (err) {
        this.$sentry.captureException(err)
        // console.log('NO TITLE FOUND')
      }
    }
    title = title || this.page.slug

    const fullURL = url + this.$route.fullPath

    return {
      title: title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description || settings.description,
        },
        // Open Graph
        { hid: 'og:url', property: 'og:url', content: fullURL },
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.page.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: url + (this.page.teaser || settings.image),
        },
        { hid: 'og:locale', property: 'og:locale', content: 'de_DE' },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.page.description,
        },
      ].filter((item) => !!item.content),
    }
  },
  computed: {
    hasSubMenu() {
      return this.breadCrumbs.length > 1
    },
    classes() {
      const classes = []
      if (this.widePage && !this.hasSubMenu) {
        classes.push('is-wide max-w-3xl mx-auto')
      } else {
        classes.push('max-w-full md:max-w-2xl')
      }
      return classes.join(' ')
    }
  }
}
</script>

<style lang="postcss">
.prose {
  @apply text-primary-700;
}
.prose h1 {
  @apply font-bold text-4xl text-primary-700;
}
.prose h2 {
  @apply font-serif italic font-bold text-primary-600;
}
.prose h1 + h2 {
  @apply -mt-2;
}
.prose h1 + .swiper-outer,
.prose h2 + .swiper-outer,
.prose h3 + .swiper-outer {
  @apply -mt-8 !important;
}

.prose blockquote {
  @apply text-xl font-serif italic text-left pl-4 pr-2 border-none text-primary-600;
  label: "Zitat";
}
.prose blockquote blockquote {
  @apply text-base -mt-6 text-right text-pink-800 not-italic;
  quotes: none;
}

.prose figure {
  @apply mt-10 mb-2;
}

@screen lg {
  .prose.is-wide .wide {
    @apply -mx-24;
  }
}
@screen xl {
  .prose.is-wide .wide {
    @apply -mx-48;
  }
}

@screen md {
  .prose .md\:text-center * {
    @apply text-center !important;
  }
}
</style>
