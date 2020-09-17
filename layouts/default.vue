  <template>
  <div class="min-h-screen bg-gray-100 w-screen text-gray-700 antialiased leading-tight">
    <TopNavSmart :navigation="nav" />
    <main class="min-h-full">
      <Nuxt class="pt-40" />
    </main>
    <Footer class="bottom-0" />
  </div>
</template>

<script>

export default {
  created() {
    this.nav = this.$store.getters['navigation/nav']
  },
  data: () => ({
    nav: null
  })
}
</script>
