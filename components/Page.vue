<template>
  <div v-editable="blok" class="flex flex-col w-full">
    <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component" class="flex"></component>
  </div>
</template>

<script>
export default {
  name: 'page',
  props: ['blok']
}
</script>

