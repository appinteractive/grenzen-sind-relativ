<template>
  <div class="container mx-auto p-6 bg-indigo-100 shadow-lg">
    <h2 class="text-2xl font-semibold leading-tight">Grenzen sind relativ e.V. - Kultur, Gesellschaft & Inklusion</h2>
    <div class="sm:flex py-4">
      <img class="flex md:w-2/6 sm:w-1/2 w-full flex-shrink-0 flex-grow sm:pr-4 mb-6 sm:mb-0 object-cover" src="http://www.grenzensindrelativ.de/wp-content/uploads/2015/04/Jubelszene1.jpg" alt="Grenzen sind relativ e.V.">
      <p class="flex text-gray-800 leading-relaxed">
        "Grenzen sind relativ e.V." setzt sich mit verschiedensten Projekten,
        Veranstaltungen und Kampagnen für eine inklusive, integrale und
        nachhaltige Gesellschaft ein. Das Pilotprojekt Мusikunterricht für
        Hörgeschädigte wurde bereits mehrfach ausgezeichnet. Spartenübergreifende
        Festivals, Aktionstage Inklusion an Schulen und Universitäten,
        Netzwerkarbeit, Workshops/Seminare und Bandcamps sind weitere Eckpfeiler
        der Plattform. In dem Musikvideo des aktuellen Crossover-Projektes
        „AndersSein vereint – Inklusionssong für Deutschland“ singen, rappen,
        grooven, tanzen und gebärden über 80 Protagonisten für die „ganzheitlich
        gelebte Inklusion“. Diverse TV-, Radio- und Presseberichte dokumentieren
        das öffentliche Interesse an den "Grenzen sind relativ"-Projekten, die
        eine Pionierfunktion in der Realisierung ganzheitlicher
        Gesellschaftsprozesse ausüben.
      </p>
    </div>
    <section class="sm:flex py-4">
      <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      story: { content: {} }
    }
  },
  asyncData (context) {
    // Load the JSON from the API
    return context.app.$storyapi.get('cdn/stories/home', {
      version: 'draft'
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
    if (!!this.$route.query.preview) {
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
    }
  },
}
</script>
