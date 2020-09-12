  <template>
  <div class="min-h-screen bg-gray-100 w-screen text-gray-700 antialiased leading-tight">
    <TopNavFancy :navigation="nav" :open="navIsOpen" :active-tab="activeTab" @change-main="setActiveTab" @mouseenter.native="navEnter" @mouseleave.native="navLeave" />
    <main class="min-h-full">
      <Nuxt class="pt-40" />
    </main>
    <Footer class="bottom-0" />
  </div>
</template>

<script>
import nav from '~/static/navigation.json'

export default {
  data: () => ({
    nav,
    navIsOpen: false,
    activeTab: 2
  }),
  watch: {
    '$route' (to, from) {
      this.navIsOpen = false
    }
  },
  methods: {
    navEnter() {
      clearTimeout(this.leaveTimer)
      this.navIsOpen = true
    },
    navLeave() {
      this.leaveTimer = setTimeout(() => {
        this.navIsOpen = false
      }, 250)
    },
    setActiveTab(index) {
      clearTimeout(this.leaveTimer)
      this.activeTab = index
      this.navIsOpen = true
    },
  }
}
</script>
