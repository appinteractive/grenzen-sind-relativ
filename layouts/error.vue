<template>
  <div class="container m-auto p-6 pb-12 h-full min-h-full flex flex-col justify-center">
    <h1 v-if="error.statusCode === 404" class="font-bold text-3xl">Seite nicht gefunden</h1>
    <h1 v-else class="font-bold text-3xl">Oops, das sollte nicht passieren</h1>
    <NuxtLink to="/">zurück zu Aktuelles</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style lang="css" scoped>
.container {
  min-height: calc(100vh - 299px);
}
</style>
