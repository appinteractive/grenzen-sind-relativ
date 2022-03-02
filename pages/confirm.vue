<template>
  <div class="min-h-full">
    <div class="pt-16 pb-32 px-4 grow min-h-full">
      <div v-if="!error" class="prose prose-green mx-auto leading-6">
        <h2 class="font-serif !text-3xl !text-primary">Einen kleinen Moment…</h2>
        <p class="text-secondary">…Dein Link wird überprüft.</p>
      </div>
      <div v-else class="prose prose-green mx-auto leading-6">
        <h2 class="font-serif !text-3xl !text-primary">Ups…</h2>
        <p class="text-secondary">…Houston wir haben ein Problem. Meld dich einfach unter <a href="mailto:mail@grenzensindrelativ.de">mail@grenzensindrelativ.de</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from 'isomorphic-fetch'

export default {
  data: () => ({
    error: false
  }),
  mounted() {
    const query = new URLSearchParams(window.location.search);
    const email = query.get('email');
    const hash = query.get('hash');

    if (!email || !hash) {
      this.error = true;
      return;
    }

    const url = `/api/confirm?email=${email}&hash=${hash}`
    fetch(url).then((res) => {
      window.location.assign('/success')
    }).catch((err) => {
      error.value = true
    })
  },
}
</script>
