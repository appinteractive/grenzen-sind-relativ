<template>
  <div
    class="relative w-full pb-16/9 bg-black bg-center"
    :style="style"
    v-observe-visibility="!visible && visibilityChanged"
    aria-label="Video abspielen"
    role="button"
  >
    <div
      v-if="!accept"
      class="absolute w-full h-full items-center justify-center flex cursor-pointer group"
      @click="accept = true"
      role="button"
    >
      <svg
        viewBox="0 0 24 24"
        class="w-12 h-12 z-10 absolute"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="#ffffff" />
      </svg>
      <icon-youtube
        class="w-20 h-20 group-hover:w-24 group-hover:h-24 text-red-800 z-10"
      />
    </div>
    <iframe
      v-if="visible && accept"
      :src="src"
      class="w-full h-full absolute top-0"
      frameborder="0"
      allowFullscreen
    ></iframe>
    <transition name="fade">
      <div v-if="title" :key="title" class="absolute pointer-events-none z-10 h-full w-full bg-black bg-opacity-75">
        <p v-if="title" class="absolute pointer-events-none z-10 text-white text-xl py-0 px-6 bottom-0">{{ title }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { ObserveVisibility } from 'vue-observe-visibility'
import IconYoutube from '~/static/svg/youtube.svg?inline'

export default {
  components: {
    IconYoutube,
  },
  directives: {
    ObserveVisibility,
  },
  props: {
    id: { type: String, required: true },
    title: { type: String, default: null },
    preview: { type: String, default: null },
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
      return `https://www.youtube.com/embed/${this.id}?feature=oembed&autoplay=1&rel=0`
    },
    style() {
      const styles = [
        `background-size: cover`,
        `background-image: url(${
          this.preview && this.preview.length > 10
            ? this.preview
            : `https://i.ytimg.com/vi/${this.id}/sddefault.jpg`
        })`,
      ]
      return this.visible ? styles.join('; ') : []
    },
  },
}
</script>
