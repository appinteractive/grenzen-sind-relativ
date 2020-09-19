<template>
  <div class="relative w-full pb-16/9">
    <iframe
      :src="src"
      class="w-full h-full absolute"
      frameborder="0"
      allowFullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true }
  },
  computed: {
    src () {
      return `https://www.youtube.com/embed/${this.id}?feature=oembed&origin=https://grenzen-sind-relativ.appinteractive.vercel.app`
    }
  }
}
</script>
