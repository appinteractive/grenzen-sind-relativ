 <template>
  <div class="container mx-auto p-6 ">
    <!-- <BreadCrumbs v-if="breadCrumbs.length > 1" :bread-crumbs="breadCrumbs" /> -->
    <div class="flex">
      <SubMenu
        v-if="breadCrumbs.length > 1"
        :sub-menu="subMenu"
        :parents="subMenu"
        :current-title="currentTitle" />
      <div
        class="mx-auto"
      >
        <article>
          <nuxt-content :document="page" class="prose" />
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $content, store, route, error }) {
    const path = `/${params.pathMatch || 'startseite'}`
    const page = await $content(path).fetch()

    let breadCrumbs = store.getters['navigation/breadCrumbs'](route)
    const crumbAnomaly = breadCrumbs.length > 1 && breadCrumbs[breadCrumbs.length - 2].children
    const off = crumbAnomaly ? 2 : 1
    const subMenu = breadCrumbs[breadCrumbs.length - off].siblings
    const currentTitle = breadCrumbs[breadCrumbs.length - off].title

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

    return { page, breadCrumbs, subMenu, currentTitle }
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
