<template>
  <div>
    <div v-if="vids.length > 0">
      <youtube :id="vids[current].videoId" :title="title" />
    </div>
    <div class="grid gap-1 h-auto pt-1" :class="`grid-cols-${vids.length}`">
      <div
        v-for="(vid, i) of vids"
        :key="vid.videoId"
        class="flex-1 relative pb-16/9 bg-black bg-center bg-cover cursor-pointer"
        :style="`background-image: url(https://i.ytimg.com/vi/${vid.videoId}/sddefault.jpg)`"
        @click="setVid(i)"
        @mouseenter="hover = i"
        @mouseout="hover = null"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videos: { type: [Array, String], default: () => [] },
  },
  data() {
    return {
      current: 0,
      hover: null,
    }
  },
  methods: {
    setVid(i) {
      this.current = i
      this.hover = null
    }
  },
  computed: {
    vids() {
      const videos = Array.isArray(this.videos)
        ? this.videos
        : JSON.parse(this.videos)
      return videos
    },
    title() {
      if (
        !this.vids ||
        this.vids.length < 1 ||
        this.hover < 0 ||
        this.hover > this.vids.length - 1 ||
        !this.vids[this.hover]
      ) {
        return null
      } else {
        console.log('HOVER', this.hover)
        return this.vids[this.hover].title
      }
    },
  },
}
</script>
