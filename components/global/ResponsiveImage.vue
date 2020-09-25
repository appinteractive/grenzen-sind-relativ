<template>
  <span
    class="w-full bg-gray-200 block mb-2 mt-10 p-0 relative"
    style="background-size: cover; background-position: center; max-height: 30rem;"
    :style="style">
    <span v-if="!loaded" class="w-full block pointer-events-none" :style="`padding-bottom: ${this.ratio}%`" />
    <img
      class="w-full object-contain transition-opacity opacity-100 duration-100 top-0"
      :class="!loaded && 'opacity-0 h-0 absolute'"
      style="max-height: 30rem; margin: 0;"
      :src="src"
      :title="title && title.length > 0 && title != 'null' ? title.trim() : null"
      :alt="alt && alt.length > 0 && alt != 'null' ? alt.trim() : null"
      :srcset="srcset && srcset.replace(/ \//g, ', /')"
      @load="loaded = true"
    />
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
  }),
  computed: {
    style() {
      const str = []
      if (this.placeholder) {
        str.push(`background-image: url('${this.placeholder}')`)
      }

      return str.join('; ')
    }
  }
}
</script>
