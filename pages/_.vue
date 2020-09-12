<template>
  <div class="container mx-auto p-6">
    <nuxt-content :document="page" class="prose" />
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $content, route, error }) {
    const page = await $content(route.path).fetch()

    console.log(route.path)
    console.log(page.slug)
    console.log(page)

    if (Array.isArray(page)) {
      throw error({ statusCode: 404, message: 'Page not found' })
    }

    try {
      const surround = await $content(page.dir)
        .sortBy('createdAt', 'asc')
        .only(['title', 'path', 'createdAt'])
        .surround(page.slug).fetch()
      console.log(surround)
    } catch (e) {}

    return { page }
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
