<template>
  <div class="container mx-auto p-6">
    <nuxt-content :document="doc" class="prose" />
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $content, route, error }) {
    const doc = await $content(route.path).fetch()
    console.log(route.path)
    console.log(doc)

    if (Array.isArray(doc)) {
      throw error({ statusCode: 404, message: 'Page not found' })
    }
    return { doc }
  },
}
</script>
