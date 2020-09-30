<script>
import helpers from '~/lib/helpers'
import Gallery from '~/components/global/Gallery'
import ResponsiveImage from '~/components/global/ResponsiveImage'
import settings from '~/config/settings.json'

export default {
  props: {
    name: { type: String, required: true }
  },
  data: () => ({
    slides: [],
    count: 0,
    autoplay: true,
    delay: 2500
  }),
  async created() {
    const data = require(`~/config/slideshows/${this.name}.json`)
    const slides = data && data.slides ? data.slides : []

    this.autoplay = data.autoplay
    this.delay = data.delay
    this.count = slides.length
    this.slides = slides

    /*
      await slides.forEach(async slide => {
        const url = helpers.urlByPath(slide.page)
        const content = await this.$content(url).only(['path', 'title', 'teaser']).fetch()
        this.slides.push(content)
      })
    */
  },
  render(createElement) {
    let children = []
    if (this.slides.length === this.count) {
      const slides = []
      this.slides.forEach((slide, i) => {
        slides.push(createElement(ResponsiveImage, {
          props: {
            key: i,
            src: slide.image || settings.image,
            alt: slide.title,
            title: slide.title
          }
        }))
      })

      children = [
        createElement(Gallery, {
          props: {
            autoplay: this.autoplay,
            delay: this.delay
          }
        }, slides)
      ]
    }
    return createElement('div', {}, children)
  }
}
</script>
