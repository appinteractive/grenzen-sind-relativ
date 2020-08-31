<template>
  <div v-editable="blok" class="flex flex-1">
    <article class="prose" v-html="richtext" />
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
    richtext() {
      return this.blok.body ? this.$storyapi.richTextResolver.render(this.blok.body) : ''
    }
  }
}
</script>

