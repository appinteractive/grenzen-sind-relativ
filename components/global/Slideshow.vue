<script>
import helpers from '~/lib/helpers'
import Gallery from '~/components/global/Gallery'
import ResponsiveImage from '~/components/global/ResponsiveImage'
import PostCard from '~/components/PostCard'
import settings from '~/config/settings.json'

export default {
  props: {
    name: { type: String, required: true },
  },
  data: () => ({
    slides: [],
    count: 0,
    autoplay: true,
    delay: 3000,
    teasers: false,
  }),
  async created() {
    const data = require(`~/config/slideshows/${this.name}.json`)
    const slides = data && data.slides ? data.slides : []

    this.autoplay = data.autoplay
    this.delay = data.delay
    this.count = slides.length
    this.slides = slides
    this.teasers = data.teasers

    if (this.teasers) {
      this.slides = []
      return new Promise((resolve) => {
        slides.forEach(async (slide) => {
          const url = helpers.urlByPath(slide.page)
          const content = await this.$content(url, { deep: true })
            .only(['path', 'title', 'description', 'teaser'])
            .fetch()
          this.slides.push({
            page: url,
            title: content.title,
            image: content.teaser,
            description: content.description,
          })

          if (this.slides.length === slides.length) {
            resolve()
          }
        })
      })
    }
  },
  render(createElement) {
    let children = []
    if (this.slides.length === this.count) {
      const slides = []
      this.slides.forEach((slide, i) => {
        if (this.teasers) {
          slides.push(
            createElement(PostCard, {
              props: {
                key: i,
                link: helpers.urlByPath(slide.page),
                image: slide.image,
                title: slide.title,
                description: slide.description,
              },
            })
          )
        } else {
          slides.push(
            createElement(ResponsiveImage, {
              props: {
                key: i,
                src: slide.image || settings.image,
                alt: slide.title,
                title: slide.subtitle || slide.title,
              },
            })
          )
        }
      })

      children = [
        createElement(
          Gallery,
          {
            props: {
              autoplay: this.autoplay,
              delay: this.delay,
              teasers: this.teasers,
            },
          },
          slides
        ),
      ]
    }
    return createElement('div', {}, children)
  },
}
</script>
