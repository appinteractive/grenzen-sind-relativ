<template>
  <div class="container mx-auto p-6 ">
    <ul class="flex pb-8" v-if="breadCrumbs.length > 1">
      <li
        v-for="(breadCrumb, depth) in breadCrumbs"
        :key="breadCrumb.title"
        class="flex items-center"
      >
        <svg class="w-4 h-4 text-gray-600" v-if="depth > 0" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        <nuxt-link
          v-if="breadCrumb.url"
          :to="breadCrumb.url"
          class="block p-2 text-gray-500 font-normal hover:text-gray-800 hover:underline rounded"
          style="font-weight: normal"
        >
          {{ breadCrumb.title }}
        </nuxt-link>
        <span
          v-else-if="!breadCrumb.showInMainNavigation"
          class="block p-2 text-gray-500 font-normal rounded"
          style="font-weight: normal"
        >
          {{ breadCrumb.title }}
        </span>
      </li>
    </ul>
    <div class="flex">
      <nav class="w-1/3 pr-4" v-if="subMenu">
        <ul>
          <li
            v-for="item in subMenu"
            :key="item.url"
          >
            <nuxt-link
              v-if="item.url"
              :to="item.url"
              class="block p-2 text-gray-600 hover:text-gray-800 hover:underline rounded"
            >
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div :class="subMenu && 'w-2/3'">
        <nuxt-content :document="page" class="prose" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $content, store, route, error }) {
    const page = await $content(route.path).fetch()
    /* const path = [...(route.path || '').split('/'), ''].filter(item => item.length)
    const depth = path.length
    console.log('depth', depth, path) */

    const nav = store.getters['navigation/nav']
    const breadCrumbs = store.getters['navigation/breadCrumbs'](route)
    const subMenu = breadCrumbs[breadCrumbs.length - 1].children

    console.log(breadCrumbs)

    // console.log(route.path)
    // console.log(page.slug)
    // console.log(page)


    if (Array.isArray(page)) {
      throw error({ statusCode: 404, message: 'Page not found' })
    }

    /* try {
      const surround = await $content(page.dir)
        .sortBy('createdAt', 'asc')
        .only(['title', 'path', 'createdAt'])
        .surround(page.slug).fetch()
      console.log(surround)
    } catch (e) {} */

    return { page, breadCrumbs, subMenu }
  },
  head() {
    let title = this.page.title
    if (!title) {
      try {
        title = this.page.body.children[0].children[1].value
      } catch (e) {}
    }

    return {
      title: `${title || this.page.slug} | Grenzen sind relativ`,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', property: 'og:description', content: this.page.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.page.description }
      ]
    }
  }
}
</script>
