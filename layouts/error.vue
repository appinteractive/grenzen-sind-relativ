<template>
  <div class="container px-4 md:px-8 m-auto p-6 pb-12 h-full min-h-full flex flex-col justify-center">
    <h1 v-if="error.statusCode === 404" class="font-bold text-3xl">Seite nicht gefunden</h1>
    <h1 v-else class="font-bold text-3xl">Oops, das sollte nicht passieren</h1>
    <a href="/">zurück zur startseite</a>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>
