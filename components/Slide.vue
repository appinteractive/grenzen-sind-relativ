<template>
  <div class="slide" v-editable="blok">
    <img :src="blok.image.filename" class="w-full h-auto border">
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>
