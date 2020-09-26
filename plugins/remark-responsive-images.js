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
    if (blur) {
      return outputName
    } else {
      return outputName.split('/static').pop()
    }
  } catch (err) {
    console.log('ERROR', err.message)
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
    const ratio = (size.height / size.width) * 100

    const images = [
      resize(input, output, sizeMax, sizeMax),
      resize(input, output, sizeMax, 460),
      resize(input, output, sizeMax, 1024),
      resize(input, output, sizeMax, 1248)
    ].filter(item => !!item)

    const srcset = []
    if (images.length == 0 && !!images[0]) srcset.push(``)
    if (images.length > 1 && !!images[1]) srcset.push(`${images[0]} 460w`)
    if (images.length > 2 && !!images[2]) srcset.push(`${images[1]} 1024w`)
    if (images.length > 3 && !!images[3]) srcset.push(`${images[2]} 1248w`)

    const srcsetString = srcset.join(', ')

    const placeholder = resize(input, output, sizeMax, 24, true)
    const buff = fs.readFileSync(placeholder, {encoding: 'base64'})
    const base64 = `data:image/${ext};base64,${buff}`

    node.type = 'html'
    node.value = `<responsive-image src="${url}" ratio="${ratio}" placeholder="${base64}" srcset="${srcsetString}" title="${node.title}" alt="${node.alt}"></responsive-image>`
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
