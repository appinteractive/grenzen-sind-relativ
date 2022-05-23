<template>
  <nuxt-link
    :to="link"
    class="post-card bg-white group overflow-hidden rounded-md border-gray-600 hover:shadow-2xl hover:border-gray-400 hover:z-0 transition duration-100"
    :aria-label="`Mehr erfahren von ${title}`"
  >
    <div v-if="image" class="relative pb-16/9 overflow-hidden rounded-t-md">
      <img
        class="absolute w-full h-full object-cover"
        :src="image"
        :alt="title"
      />
    </div>
    <div class="p-2 pb-8 overflow-hidden !max-h-[50vw] sm:!max-h-[200px]">
      <h3
        class="font-medium !text-base tracking-tight group-hover:underline pb-2 text-gray-800"
        v-html="title"
      />
      <p class="text-gray-800 font-normal" v-html="description" />
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
        class="absolute flex justify-end w-full bottom-0 left-0 text-right p-2 pr-2 text-blue-700 text-xs uppercase tracking-wide font-semibold"
        aria-hidden="true"
      >
        <div
          class="rounded items-center flex bg-[#D65400] text-white px-3 py-1.5 shadow"
        >
          Mehr erfahren
          <!-- <svg
            class="w-4 h-4 ml-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg> -->
        </div>
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
