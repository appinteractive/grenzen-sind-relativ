<template>
  <nuxt-link
    :to="link"
    class="post-card bg-white group overflow-hidden rounded-sm border-gray-600 hover:shadow-2xl hover:border-gray-400 hover:z-0 transition duration-100"
    :aria-label="`weiterlesen von ${title}`"
  >
    <div v-if="image" class="relative pb-16/9">
      <img
        class="absolute w-full h-full object-cover"
        :src="image"
        :alt="title"
      />
    </div>
    <div class="p-2 pb-8 overflow-hidden !max-h-[50vw] sm:!max-h-[200px]">
      <h3
        class="font-medium tracking-tight group-hover:underline pb-2 text-gray-800"
        v-html="title"
      />
      <p class="text-gray-700 font-normal" v-html="description" />
      <div
        class="absolute w-full bottom-0 left-0 from-white h-24 mb-6 bg-gradient-to-t"
        aria-hidden="true"
      >
        &nbsp;
      </div>
      <div
        class="absolute w-full bottom-0 left-0 h-6 bg-white"
        aria-hidden="true"
      >
        &nbsp;
      </div>
      <div
        class="absolute w-full bottom-0 left-0 text-right p-2 pr-4 text-blue-700 text-sm uppercase font-semibold"
        aria-hidden="true"
      >
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
    description: { type: String, required: true },
  },
}
</script>

<style lang="postcss">
.prose .post-card h3 {
  @apply leading-tight;
}
.prose .post-card {
  @apply leading-tight;
}
</style>
