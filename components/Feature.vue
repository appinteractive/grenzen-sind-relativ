<template>
  <div v-editable="blok" class="flex flex-1">
    <h1 class="text-3xl font-bold">{{ blok.name }}</h1>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

