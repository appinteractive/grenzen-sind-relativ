<template>
  <div class="container mx-auto px-4 lg:px-6 pt-6">
    <!-- <BreadCrumbs v-if="breadCrumbs.length > 1" :bread-crumbs="breadCrumbs" /> -->
    <div class="flex flex-wrap lg:flex-no-wrap lg:flex-col-reverse flex-col">
      <article
        class="w-full flex lg:justify-end xl:justify-center ml-auto pb-16"
      >
        <nuxt-content
          :document="page"
          class="prose w-full break-words hyphens-auto"
        />
      </article>
      <div class="lg:w-2/6">
        <SubMenu
          v-if="breadCrumbs.length > 1"
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
    redirect,
    store,
    route,
    error,
    payload,
  }) {
    const path = `/${params.pathMatch || 'index'}`
    const page = await $content(path).fetch()

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

    /* const featured = await $content().where({ featured: true }).fetch()
    console.log(featured) */

    /* try {
      const surround = await $content(page.dir)
        .sortBy('createdAt', 'asc')
        .only(['title', 'path', 'createdAt'])
        .surround(page.slug).fetch()
      console.log(surround)
    } catch (e) {} */

    return { page, breadCrumbs, subMenu, currentTitle }
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
      } catch (e) {
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
}
</script>

<style lang="postcss">
.prose h1 {
  @apply font-serif text-gray-900;
}
.prose h2 {
  @apply font-serif text-gray-800;
}
.prose h1 + h2 {
  @apply -mt-2;
}

.prose blockquote {
  @apply text-xl font-serif text-left pl-4 pr-2 border-none text-indigo-800;
}
.prose blockquote blockquote {
  @apply text-base -mt-6 text-right text-pink-800 not-italic;
  quotes: none;
}

.prose figure {
  @apply mt-10 mb-2;
}
</style>
