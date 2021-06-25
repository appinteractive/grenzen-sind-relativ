  <template>
  <div class="min-h-screen flex flex-col bg-gray-100 w-screen text-gray-700 antialiased leading-tight">
    <TopNavSmart :navigation="mainNav" :active-main="activeMain" :current-title="currentTitle" />
    <main class="min-h-full flex-grow" style="min-height: 30rem" role="main" aria-label="Inhalt">
      <Nuxt class="!pt-32" />
    </main>
    <!-- <VueAnnouncer /> -->
    <Footer :navigation="footerNav" :copyright="copyright" aria-label="Fußleiste" />
  </div>
</template>

<script>

export default {
  created() {
    this.mainNav = this.$store.getters['navigation/mainNav']
    this.footerNav = this.$store.getters['navigation/footerNav']
    this.copyright = this.$store.getters['navigation/copyright']

    const breadCrumbs = this.$store.getters['navigation/breadCrumbs'](this.$route)
    this.activeMain = breadCrumbs && breadCrumbs.length ? breadCrumbs[0].title : null

    const crumbAnomaly = breadCrumbs.length > 1 && breadCrumbs[breadCrumbs.length - 2].children
    const off = crumbAnomaly ? 2 : 1
    const lastCrumb = breadCrumbs[breadCrumbs.length - off]
    this.currentTitle = lastCrumb ? lastCrumb.title : null
  },
  data: () => ({
    mainNav: null,
    footerNav: null,
    copyright: null,
    activeMain: null,
    currentTitle: null
  }),
  watch: {
    '$route' (to, from) {
      let breadCrumbs = this.$store.getters['navigation/breadCrumbs'](this.$route)
      this.activeMain = breadCrumbs && breadCrumbs.length ? breadCrumbs[0].title : null
    }
  },
}
</script>
