<template>
  <div v-editable="blok">
    {{ blok.headline }}
    <component :key="blok._uid" v-for="blok in blok.slide" :blok="blok" :is="blok.component" class="flex"></component>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

