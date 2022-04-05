<template>
  <div class="flex">
    <a
      :href="src"
      class="rounded !mx-auto !flex !flex-shrink items-center hover:!no-underline !no-underline !inline-flex bg-[#4072B2] !text-sm !text-white !font-bold uppercase px-3 py-1.5 shadow"
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
    </a>
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, require: true },
  },
}
</script>
