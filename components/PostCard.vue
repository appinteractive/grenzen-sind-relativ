<template>
  <nuxt-link :to="link" class="post-card bg-white group overflow-hidden rounded-sm border-gray-600 hover:shadow-2xl hover:border-gray-400 hover:z-0 transition duration-100">
    <div v-if="image" class="relative pb-16/9">
      <img class="absolute w-full h-full object-cover" :src="image" alt="title">
    </div>
    <div style="max-height: 200px;" class="p-2 pb-8 overflow-hidden">
      <h3 class="font-medium tracking-tight group-hover:underline pb-2 text-gray-800" v-html="title" />
      <p class="text-gray-700 font-normal" v-html="description" />
      <div class="absolute w-full bottom-0 left-0 from-white h-24 mb-4 bg-gradient-to-t">&nbsp;</div>
      <div class="absolute w-full bottom-0 left-0 h-4 bg-white">&nbsp;</div>
      <div class="absolute w-full bottom-0 left-0 bg-white text-right p-2 pr-4 text-blue-500 text-sm uppercase font-semibold">
        weiterlesen →
      </div>
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

<style lang="postcss">
.prose .post-card h3 {
  @apply leading-tight;
}
.prose .post-card  {
  @apply leading-tight;
}
</style>
