const visit = require('unist-util-visit')
const fs = require('fs')
const sharp = require('sharp')
const { resolve } = require('path')
const sizeOf = require('image-size');

const MurmurHash3 = require('imurmurhash')
const uniqId = (uniq) => {
  var hash = new MurmurHash3(uniq)
  return ('00000000' + hash.result().toString(16)).substr(-8)
}

const resize = (input, output, originalSize, outputSize, blur) => {
  if (originalSize < outputSize && !blur) return null

  let outputName = output
  const ext = output.split('.').pop()
  const fileName = output.split('/').pop().replace(`.${ext}`, '')
  const fullName = `${fileName}.${ext}`

  try {
    let image = sharp(input)
      .resize(outputSize, null, {
        withoutEnlargement: true
      })
      .toFormat(ext, {
        quality: 90,
        progressive: true
      })
    if (blur) {
      outputName = outputName.replace(fullName, `${fileName}-blurred.${ext}`)
      image.blur(10)
    } else {
      outputName = outputName.replace(fullName, `${fileName}-w${outputSize}.${ext}`)
    }
    image.toFile(outputName)
    return outputName.split('/static').pop()
  } catch (err) {
    console.log('ERROR', err.message)
    console.log(output)
  }
}

async function visitor(node) {
  var url = node.url

  if (url) {
    const hash = uniqId(url)
    const ext = url.split('.').pop()
    const output = resolve(`${__dirname}/../static/thumbs/${hash}.${ext}`)
    const input = resolve(`${__dirname}/../static${url}`)

    if (!fs.existsSync(input)) {
      console.log('IMAGE MISSING', input)
      return
    }

    const size = await sizeOf(input)
    const sizeMax = Math.max(size.width, size.height)
    const ratio = size.width / size.height

    const images = [
      resize(input, output, sizeMax, 460),
      resize(input, output, sizeMax, 1024),
      resize(input, output, sizeMax, 1248)
    ].filter(item => !!item)

    const srcset = []
    srcset.push(`${images[0]} 460w`)
    if (images.length > 1) srcset.push(`${images[1]} 1024w`)
    if (images.length > 2) srcset.push(`${images[2]} 1248w`)

    const srcsetString = srcset.join(', ')
    console.log(srcsetString)

    const placeholder = resize(input, output, sizeMax, 100, true)

    node.type = 'html'
    node.value = `<responsive-image src="${images[0]}" ratio="${ratio}" placeholder="${placeholder}" srcset="${srcsetString}" title="${node.title}" alt="${node.alt}"></responsive-image>`
  } else {
    // console.log('URL IS NO IMAGE', url)
  }
}

async function transformer(tree, file, done) {
  await visit(tree, 'image', visitor)

  done()
}

function responsiveImages() {
  return transformer
}

module.exports = responsiveImages
