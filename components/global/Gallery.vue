<script>

function getGalleryItem(tag, item) {
  if (!tag.tag) return
  if (tag.tag === 'img') {
    return { ...item, url: tag.src}
  }
  if (tag.tag === 'p') {
    return getGalleryItem(tag.children[0], item)
  }
  if (tag.tag === 'a') {
    return getGalleryItem(tag.children[0], { ...item, title: tag.title, link: tag.href })
  }
  if (tag.tag.indexOf('vue-component') === 0) {
    return tag
  }
  return item
}

export default {
  data: () => ({
    items: [],
    loaded: false,
    visible: false,
    swiperOption: {
      speed: 600,
      spaceBetween: 0,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
        stopOnLastSlide: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  }),
  mounted() {
    this.$slots['default']
      .forEach(tag => {
        const item = getGalleryItem(tag, {
          title: null,
          url: null
        })
        if (item) {
          this.items.push(item)
        }
      })
    /* console.log(this.items[0])
    this.items[0].addEventListener('load', () => {
      console.log('LOADED!')
      this.loaded = true
    }) */
    this.visible = true;
  },
  beforeDestroy() {
    this.visible = false;
  },
  render(createElement) {
    /* if (!this.visible) {
      return createElement('div');
    } */
    let children = []
    children = [
      createElement('swiper', {
        class: 'swiper',
        props: { options: this.swiperOption },
        ref: 'slider',
      }, [
        createElement('div', {
          class: 'swiper-button-prev',
          slot: 'button-prev'
        }),
        createElement('div', {
          class: 'swiper-button-next',
          slot: 'button-next'
        }),
        createElement('div', {
          class: 'swiper-pagination',
          slot: 'pagination'
        }),
        ...this.items.map((item) => createElement('swiper-slide', {
          class: '',
        }, [item])),
      ])
    ]
    return createElement('div', {}, children)
  }
}
</script>

<style lang="postcss">
.prose .swiper {
  @apply p-0 m-0
}
.prose .swiper-wrapper {
  @apply overflow-y-visible p-0 m-0
}
.prose .swiper-pagination {
  @apply p-0 m-0 -mb-10
}
</style>
