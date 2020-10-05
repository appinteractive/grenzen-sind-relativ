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
    return createElement('div', { class: 'slideshow' }, children)
  },
}
</script>

<style lang="postcss">
.prose .slideshow .swiper-slide {
  @apply bg-white border !important;
}
.prose .slideshow .swiper-slide img {
  @apply p-0 m-0 !important;
}
.prose .slideshow .swiper-slide p, .swiper-slide h3 {
  @apply px-4 pb-2 !important;
}
.prose .slideshow .swiper-slide h3 {
  @apply pt-2 mt-0 !important;
}
.prose .slideshow .swiper {
  @apply px-12 !important;
}
.prose .slideshow .swiper-button-prev.swiper-button-disabled,
.prose .slideshow .swiper-button-next.swiper-button-disabled {
  @apply text-gray-500 text-opacity-0 !important;
}
.prose .slideshow .swiper-button-prev,
.prose .slideshow .swiper-button-next {
  @apply h-full p-0 m-0 top-0 px-6 from-gray-100 z-10 text-blue-700 opacity-100 font-bold !important;
}
.prose .slideshow .swiper-button-prev {
  @apply -ml-3 bg-gradient-to-r !important;
}
.prose .slideshow .swiper-button-next {
  @apply -mr-3 bg-gradient-to-l !important;
}
</style>
