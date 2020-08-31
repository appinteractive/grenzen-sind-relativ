<template>
  <div v-editable="blok" class="flex flex-wrap">
    <!-- {{ blok.headline }} -->
    <component
      v-for="blok in blok.slide"
      :key="blok._uid"
      :blok="blok"
      :is="blok.component"
      class="flex w-1/2"
    ></component>
  </div>
</template>

<script>
export default {
  props: ['blok'],
}
</script>
