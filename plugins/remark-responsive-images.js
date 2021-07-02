const visit = require('unist-util-visit')
const { createThumbnails } = require('../lib/thumbs')

async function visitor(node) {
  var url = node.url
  if (url) {
    try {
      const {
        ratio,
        base64,
        srcsetString
      } = await createThumbnails(url)

      node.type = 'html'
      node.value = `<responsive-image src="${url}" ratio="${ratio}" placeholder="${base64}" srcset="${srcsetString}" title="${node.title}" alt="${node.alt}"></responsive-image>`
    } catch {
      console.log(`Skipped Image ${url}`)
    }
  } else {
    console.log('URL IS NO IMAGE', url)
  }
}

async function transformer(tree, file, done) {
  const images = []
  visit(tree, 'image', node => images.push(node))
  for (const node of images) {
    await visitor(node)
  }
  done()
}

function responsiveImages() {
  console.log('THUMBNAILS...')
  return transformer
}

module.exports = responsiveImages
