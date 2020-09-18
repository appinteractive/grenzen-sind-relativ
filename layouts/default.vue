  <template>
  <div class="min-h-screen bg-gray-100 w-screen text-gray-700 antialiased leading-tight">
    <TopNavSmart :navigation="mainNav" />
    <main class="min-h-full">
      <Nuxt class="pt-40" />
    </main>
    <Footer class="bottom-0" :navigation="footerNav" />
  </div>
</template>

<script>

export default {
  created() {
    this.mainNav = this.$store.getters['navigation/mainNav']
    this.footerNav = this.$store.getters['navigation/footerNav']
  },
  data: () => ({
    mainNav: null,
    footerNav: null
  })
}
</script>
