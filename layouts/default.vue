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
    item.url = (item.url || '').replace(/content(.+)\.md/, '$1')
    if (item.children && item.children.length) {
      item.children = normalizeUrls(item.children)
    }
  });

  return output
}

export default {
  data: () => ({
    nav: normalizeUrls(nav)
  })
}
</script>
