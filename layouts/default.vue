  <template>
  <div class="min-h-screen bg-gray-100 w-screen text-gray-700 antialiased leading-tight">
    <TopNavSmart :navigation="mainNav" />
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
  },
  data: () => ({
    mainNav: null,
    footerNav: null,
    copyright: null
  })
}
</script>
