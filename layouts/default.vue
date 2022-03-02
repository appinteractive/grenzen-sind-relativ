<template>
  <div
    class="
      min-h-screen
      flex flex-col
      bg-gray-100
      w-screen
      text-gray-700
      antialiased
      leading-tight
    "
  >
    <TopNavSmart
      :navigation="mainNav"
      :active-main="activeMain"
      :current-title="currentTitle"
    />
    <main
      class="min-h-full flex-grow"
      style="min-height: 30rem"
      role="main"
      aria-label="Inhalt"
    >
      <Nuxt class="!pt-32" />
    </main>
    <!-- <VueAnnouncer /> -->
    <nav class="fixed right-0 top-[20rem] sm:top-[10rem]">
      <a
        :href="deepLink"
        class="
          bg-white
          rounded-l-md
          border
          shadow
          flex flex-col
          items-center
          justify-center
          p-2
          sm:p-4
          pr-4
          sn:pr-6
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 sm:h-8 sm:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <span class="text-center leading-4 pt-2 text-xs sm:text-sm"
          >Leichte<br />Sprache</span
        >
      </a>
    </nav>
    <Footer
      :navigation="footerNav"
      :copyright="copyright"
      aria-label="Fußleiste"
    />
  </div>
</template>

<script>
export default {
  async created() {
    this.mainNav = this.$store.getters['navigation/mainNav']
    this.footerNav = this.$store.getters['navigation/footerNav']
    this.copyright = this.$store.getters['navigation/copyright']

    const breadCrumbs = this.$store.getters['navigation/breadCrumbs'](
      this.$route
    )
    this.activeMain =
      breadCrumbs && breadCrumbs.length ? breadCrumbs[0].title : null

    const crumbAnomaly =
      breadCrumbs.length > 1 && breadCrumbs[breadCrumbs.length - 2].children
    const off = crumbAnomaly ? 2 : 1
    const lastCrumb = breadCrumbs[breadCrumbs.length - off]
    this.currentTitle = lastCrumb ? lastCrumb.title : null

    this.deepLink = await this.accessibleDeepLink
  },
  data: () => ({
    mainNav: null,
    footerNav: null,
    copyright: null,
    activeMain: null,
    currentTitle: null,
    deepLink: '',
  }),
  computed: {
    async accessibleDeepLink() {
      const p = this.$route.path.replace(/^\//, '')
      const path = `/${p || 'index'}`
      const page = await this.$content(path)
        .only(['accessible'])
        .fetch()
        .catch((err) => {
          // console.error(err)
        })

      let baseLink =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3002'
          : 'https://leicht.grenzensindrelativ.de'
      let link = baseLink

      if (page?.accessible === false) {
        return baseLink
      }
      link = page?.accessible ?? `${link}${this.$route.path}`

      if (!link.startsWith('http')) {
        link = `${baseLink}${link}`
      }

      return link
    },
  },
  watch: {
    $route(to, from) {
      let breadCrumbs = this.$store.getters['navigation/breadCrumbs'](
        this.$route
      )
      this.activeMain =
        breadCrumbs && breadCrumbs.length ? breadCrumbs[0].title : null

      this.$nextTick(async () => {
        this.deepLink = await this.accessibleDeepLink
      })
    },
  },
}
</script>
