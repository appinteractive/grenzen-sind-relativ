import helpers from '~/lib/helpers'

function processSlideshow(name, props, $content) {
  const data = require(`~/config/slideshows/${name}.json`)
  let slides = data && data.slides ? data.slides : []

  // const { createThumbnails } = require('~/lib/thumbs').default

  if (data.teasers) {
    const slidesNew = []
    return new Promise((resolve) => {
      slides.forEach(async (slide) => {
        const url = helpers.urlByPath(slide.page)
        const content = await $content(url, { deep: true })
          .only(['path', 'title', 'description', 'teaser'])
          .fetch()

        // TODO: find issue
        /* const {
          ratio,
          base64,
          srcsetString
        } = createThumbnails ? await createThumbnails(content.teaser) : null */

        slidesNew.push({
          page: url,
          title: content.title,
          image: content.teaser,
          // ratio,
          // base64,
          // srcsetString,
          description: content   .description,
        })

        if (slidesNew.length === slides.length) {
          slides = slidesNew
          props.slides = JSON.stringify(slidesNew)
          props.delay = data.delay
          props.autoplay = data.autoplay
          props.teasers = true
          resolve(slides)
        }
      })
    })
  }

  return slides
}

function processVideoGallery(name, props) {
  const data = require(`~/config/video-galleries/${name}.json`)
  let videos = data && data.videos ? data.videos : []

  const videosNew = []
  return new Promise((resolve) => {
    videos.forEach((video) => {
      videosNew.push({
        videoId: video.videoId,
        title: video.title,
      })

      if (videosNew.length === videos.length) {
        videos = videosNew
        props.videos = JSON.stringify(videosNew)
        resolve(videos)
      }
    })
  })
}

export default {
  processSlideshow,
  processVideoGallery,
}
