<template>
  <footer class="w-full bg-gray-700 text-gray-400 mt-6">
    <div class="container m-auto px-6 py-10">
      <div class="grid lg:grid-cols-3 gap-6">
        <div class="flex flex-col gap-5">
          <h3 class="uppercase tracking-wider text-sm font-bold">Rechtliches</h3>
          <div class="flex flex-col gap-2 text-gray-400">
            <nuxt-link to="/" class="hover:underline hover:text-white">Impressum</nuxt-link>
            <nuxt-link to="/" class="hover:underline hover:text-white">Datenschutz</nuxt-link>
            <nuxt-link to="/" class="hover:underline hover:text-white">Kontakt</nuxt-link>
          </div>
        </div>
        <div class="flex flex-col gap-5">
          <h3 class="uppercase tracking-wider text-sm font-bold">Grenzen sind relativ e.V.</h3>
          <div class="flex flex-col gap-2 text-gray-400">
            <nuxt-link to="/" class="hover:underline hover:text-white">Blog</nuxt-link>
            <nuxt-link to="/" class="hover:underline hover:text-white">Presse</nuxt-link>
            <nuxt-link to="/" class="hover:underline hover:text-white">Spenden</nuxt-link>
          </div>
        </div>
        <div class="flex flex-col gap-5">
          <h3 class="uppercase tracking-wider text-sm font-bold">Anmeldung zum Newsletter</h3>
          <div class="flex flex-col">
            <p class="text-gray-400 text-sm">Melde dich hier zu unserem Newsletter an, um über aktuelle Events und Projekte auf dem laufenden zu bleiben.</p>
            <input type="email" class="rounded mt-3 py-3 px-4 text-gray-800" placeholder="Deine E-Mail">
            <button class="rounded bg-gray-600 mt-2 py-3 px-4 text-white font-bold tracking-wide">Anmelden</button>
          </div>
        </div>
      </div>
      <div class="text-sm">
        © 2020 - Grenzen sind relativ e.V.
      </div>
    </div>
  </footer>
</template>
