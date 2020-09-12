<template>
  <div class="container mx-auto p-6">
    <h2 class="text-4xl font-bold">Aktivitäten</h2>
    <p>Hier gibts eine Auflistung unserer Aktivitäten</p>
    <!-- <nuxt-content :document="doc" class="prose" /> -->
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $content, route, error }) {
    const doc = await $content('/aktivitaeten', { deep: true }).fetch()



    /* if (Array.isArray(doc)) {
      throw error({ statusCode: 404, message: 'Page not found' })
    } */
    return { doc }
  },
}
</script>
