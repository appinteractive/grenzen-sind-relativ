  <template>
  <div class="min-h-screen bg-gray-100 w-screen text-gray-700 antialiased leading-tight">
    <TopNavSmart :navigation="mainNav" :active-main="activeMain" />
    <main class="min-h-full">
      <Nuxt class="pt-40" style="min-height: 50rem" />
    </main>
    <Footer class="bottom-0" :navigation="footerNav" :copyright="copyright" />
  </div>
</template>

<script>

export default {
  created() {
    this.mainNav = this.$store.getters['navigation/mainNav']
    this.footerNav = this.$store.getters['navigation/footerNav']
    this.copyright = this.$store.getters['navigation/copyright']

    let breadCrumbs = this.$store.getters['navigation/breadCrumbs'](this.$route)
    this.activeMain = breadCrumbs && breadCrumbs.length ? breadCrumbs[0].title : null
  },
  data: () => ({
    mainNav: null,
    footerNav: null,
    copyright: null,
    activeMain: null
  }),
  watch: {
    '$route' (to, from) {
      let breadCrumbs = this.$store.getters['navigation/breadCrumbs'](this.$route)
      this.activeMain = breadCrumbs && breadCrumbs.length ? breadCrumbs[0].title : null
    }
  },
}
</script>
