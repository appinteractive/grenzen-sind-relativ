<template>
  <figure
    class="w-full bg-gray-200 block mb-2 mt-10 p-0 relative"
    style="
      background-size: cover;
      background-position: bottom;
      max-height: 30rem;
    "
    :style="style"
    v-observe-visibility="!visible && visibilityChanged"
  >
    <span
      v-if="!loaded"
      class="w-full block pointer-events-none"
      :style="`padding-bottom: ${this.ratio}%`"
    />
    <transition name="fade">
      <img
        v-if="visible || loaded"
        class="w-full object-contain top-0"
        :class="!loaded && 'absolute'"
        style="max-height: 30rem; margin: 0"
        :src="src"
        :title="imgTitle"
        :alt="imgAlt"
        :srcset="srcset && srcset.replace(/ \//g, ', /')"
        @load="loaded = true"
      />
    </transition>
    <figcaption v-if="imgTitle" class="absolute bottom-0 p-3 w-full bg-black bg-opacity-50 flex flex-col">
      <span class="text-white font-semibold">{{ imgAlt }}</span>
      <span v-if="imgAlt !== imgTitle" class="text-gray-200 text-xs">{{ imgTitle }}</span>
    </figcaption>
  </figure>
</template>

<script>
import { ObserveVisibility } from 'vue-observe-visibility'

export default {
  directives: {
    ObserveVisibility,
  },
  props: {
    src: { type: String, required: true },
    srcset: { type: String, default: null },
    placeholder: { type: String, default: null },
    title: { type: String, default: '' },
    alt: { type: String, required: true },
    ratio: { type: [Number, String], default: null },
  },
  data: () => ({
    loaded: false,
    visible: false,
  }),
  methods: {
    visibilityChanged(visible, entry) {
      this.visible = visible
    },
  },
  computed: {
    imgTitle() {
      return this.title && this.title.length > 0 && this.title != 'null'
        ? this.title.trim()
        : null
    },
    imgAlt() {
      return this.alt && this.alt.length > 0 && this.alt != 'null'
        ? this.alt.trim()
        : null
    },
    caption() {
      return this.imgTitle || this.imgAlt || null
    },
    style() {
      const str = []
      if (this.placeholder) {
        str.push(`background-image: url('${this.placeholder}')`)
      }

      return str.join('; ')
    },
  },
}
</script>
