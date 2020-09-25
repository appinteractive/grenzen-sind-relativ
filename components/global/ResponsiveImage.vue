<template>
  <span
    class="w-full bg-gray-200 block mb-2 mt-10 p-0"
    style="background-size: cover; background-position: center;"
    :style="placeholder && `background-image: url('${placeholder}')`">
    <img
      v-if="placeholder && !loaded"
      class="w-full  bg-no-repeat opacity-0"
      style="max-height: 30rem; margin: 0;"
      :src="placeholder"
    />
    <img
      class="w-full object-contain transition-opacity opacity-100 duration-100"
      :class="!loaded && 'opacity-0'"
      style="max-height: 30rem; margin: 0;"
      :src="src"
      :title="title && title.length > 0 && title != 'null' ? title.trim() : null"
      :alt="alt && alt.length > 0 && alt != 'null' ? alt.trim() : null"
      :srcset="srcset && srcset.replace(/ \//g, ', /')"
      @load="loaded = true"
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
    alt: { type: String, required: true },
    ratio: { type: [Number, String], default: null }
  },
  data: () => ({
    loaded: false
  })
}
</script>
