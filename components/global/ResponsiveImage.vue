<template>
  <span
    class="w-full bg-gray-200 block mb-2 mt-10 p-0"
    style="background-size: cover; background-position: center;"
    :style="placeholder && `background-image: url('${placeholder}')`">
    <img
      class="w-full object-contain bg-cover bg-no-repeat top-0"
      style="max-height: 30rem; margin: 0;"
      :src="placeholder && srcset ? placeholder : src"
      :title="title"
      :alt="alt"
      :srcset="srcset && srcset.replace(/w /g, 'w, ')"
    />
    <!-- <img
      class="w-full object-contain bg-cover bg-no-repeat top-0"
      style="max-height: 30rem; margin: 0;"
      :src="src"
      :title="title"
      :alt="alt"
      :srcset="srcset.replace(/w /g, 'w, ')"
    /> -->
  </span>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    srcset: { type: String, default: null },
    placeholder: { type: String, default: null },
    title: { type: String, default: '' },
    alt: { type: String, required: true }
  }
}
</script>
