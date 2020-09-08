<template>
  <div class="container mx-auto p-6">
    <nuxt-content :document="doc" class="prose" />
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $content, route }) {
    console.log(params)
    const doc = await $content(route.path).fetch()
    console.log(doc)

    return { doc }
  },
}
</script>
