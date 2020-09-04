<template>
  <nuxt-link :to="link" class="bg-white group overflow-hidden rounded-sm border border-gray-200 hover:shadow-2xl hover:border-gray-400 hover:z-0 transition duration-100">
    <img v-if="image" :src="image" alt="">
    <div class="p-6 pb-8">
      <h3 class="font-medium tracking-wide group-hover:underline pb-2 text-xl text-gray-800" v-html="title" />
      <p class="text-gray-700" v-html="description" />
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    link: { type: String, default: '/' },
    image: { type: String, default: null },
    title: { type: String, required: true },
    description: { type: String, required: true }
  }
}
</script>
