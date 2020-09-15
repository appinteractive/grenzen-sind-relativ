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
import nav from '~/static/navigation.json'

function normalizeUrls(items) {
  const output = [ ...items ]

  output.forEach(item => {
    item.url = (item.url || '').replace(/\/content(.+)\.md/, '$1')
    if (item.children && item.children.length) {
      item.children = normalizeUrls(item.children)
    }
  });

  return output
}

export default {
  data: () => ({
    nav: normalizeUrls(nav),
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
