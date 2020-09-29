<template>
  <div
    class="relative w-full pb-16/9 bg-black bg-center"
    :style="style"
    v-observe-visibility="!visible && visibilityChanged"
  >
    <div
      v-if="!accept"
      class="absolute w-full h-full items-center justify-center flex cursor-pointer group"
      @click="accept = true"
    >
      <svg
        viewBox="0 0 24 24"
        class="w-20 h-20 opacity-75 group-hover:w-24 group-hover:h-24 group-hover:opacity-100 transition-all duration-100 ease-in-out text-pink-700 border-white border-2 rounded-full"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="#ffffff" />
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/>
      </svg>
    </div>
    <iframe
      v-if="visible && accept"
      :src="src"
      class="w-full h-full absolute top-0"
      frameborder="0"
      allowFullscreen
    ></iframe>
  </div>
</template>

<script>
import { ObserveVisibility } from 'vue-observe-visibility'

export default {
  directives: {
    ObserveVisibility,
  },
  props: {
    id: { type: String, required: true },
  },
  data: () => ({
    visible: false,
    accept: false,
  }),
  methods: {
    visibilityChanged(visible, entry) {
      this.visible = visible
    },
  },
  computed: {
    src() {
      return `https://www.youtube.com/embed/${this.id}?feature=oembed&autoplay=1`
    },
    style() {
      const styles = [
        `background-size: cover`,
        `background-image: url(https://i.ytimg.com/vi/${this.id}/sddefault.jpg)`,
      ]
      return this.visible ? styles.join('; ') : []
    },
  },
}
</script>
