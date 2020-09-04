<template>
  <div class="container mx-auto p-6">
    <nav class="text-gray-500 text-sm my-8" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex items-baseline">
        <li class="flex items-center">
          <a href="#" class="hover:text-gray-900 hover:underline">Was wir tun</a>
          <svg class="fill-current w-2 h-2 mx-2 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="flex items-center">
          <a href="#" class="hover:text-gray-900 hover:underline">Projekte</a>
          <svg class="fill-current w-2 h-2 mx-2 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        </li>
        <li class="font-bold text-gray-800 text-2xl" aria-current="page">
          Musikunterricht für Hörgeschädigte
        </li>
      </ol>
    </nav>
    <section class="sm:flex py-4" >
      <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      story: { content: { body: '' } }
    }
  },
  asyncData (context) {
    console.log(`cdn/stories/de/projekte/${context.params.slug}`)
    // Load the JSON from the API
    return context.app.$storyapi.get(`cdn/stories/[default]/de/projekte/${context.params.slug}`, {
      // version: 'draft'
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  },
  mounted () {
    // if (!!this.$route.query.preview) {
      // use the bridge to listen to events
      this.$storybridge.on(['input', 'published', 'change'], (event) => {
        if (event.action == 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content
          }
        } else {
          // window.location.reload()
          this.$nuxt.$router.go({
            path: this.$nuxt.$router.currentRoute,
            force: true,
          })
        }
      })
    // }
  },
}
</script>
