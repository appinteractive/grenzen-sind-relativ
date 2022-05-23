<template>
  <footer class="w-full bg-[#072848] text-gray-100 bottom-0">
    <div class="container m-auto px-4 md:px-8 py-10 pb-16 lg:pb-10">
      <div class="grid lg:grid-cols-3">
        <div
          v-for="col in navigation"
          :key="col.title"
          class="flex flex-col pb-8"
        >
          <h3 class="text-xs uppercase text-gray-100 font-bold pb-3">
            {{ col.title }}
          </h3>
          <div>
            <div
              v-for="row in col.children"
              :key="row.title"
              class="flex flex-col pb-1 text-gray-200"
            >
              <nuxt-link
                v-if="row.url"
                :to="row.url"
                class="hover:underline hover:text-white"
              >
                {{ row.title }}
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="flex flex-col pb-8">
          <h3 class="text-xs uppercase text-gray-100 font-bold pb-3">
            Anmeldung zum Newsletter
          </h3>
          <form
            v-if="!subscribed"
            class="flex flex-col"
            @submit.prevent="subscribe"
          >
            <p class="text-gray-200 text-sm">
              Melde dich hier zu unserem Newsletter an, um über aktuelle Events
              und Projekte auf dem laufenden zu bleiben.
            </p>
            <input
              v-model="email"
              type="email"
              aria-label="E-Mail für Newsletteranmeldung"
              name="email"
              class="rounded mt-3 py-3 px-4 bg-[#32669A] text-primary-900 placeholder-white focus:placeholder-black focus:bg-white"
              placeholder="Deine E-Mail"
              :disabled="loading"
            />
            <button
              name="submit"
              type="submit"
              class="rounded bg-[#184571] border border-white border-opacity-50 mt-2 py-3 px-4 text-white font-bold tracking-wide"
              aria-label="zum Newsletter anmelden"
              :disabled="loading"
            >
              Anmelden
            </button>
          </form>
          <div v-else class="flex items-center">
            <span>Check deine E-Mails</span>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="text-sm flex flex-grow">
          {{ copyright }}
        </div>
        <social-icons class="flex justify-end items-center text-gray-300" />
      </div>
    </div>
  </footer>
</template>

<script>
import fetch from 'isomorphic-fetch'

export default {
  props: {
    navigation: { type: Array, default: () => [], required: true },
    copyright: { type: String, required: true },
  },
  data() {
    return {
      email: null,
      error: false,
      loading: false,
      subscribed: false,
    }
  },
  methods: {
    subscribe() {
      if (this.loading) return

      this.loading = true
      if (
        !this.email ||
        !this.email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ) {
        this.error = true
        return
      }

      fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email: this.email.trim(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          this.subscribed = true
          setTimeout(() => {
            this.subscribed = false
          }, 5000)
          this.loading = false
        })
        .catch((err) => {
          this.error = true
          this.loading = false
        })
    },
  },
}
</script>

<style lang="postcss">
footer .link-active {
  @apply font-bold text-white;
}
</style>
