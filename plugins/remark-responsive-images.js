const visit = require('unist-util-visit')
const domain = 'https://next.grenzensindrelativ.de'
const fs = require('fs')
const sharp = require('sharp')
const { resolve } = require('path')

const MurmurHash3 = require('imurmurhash')
const uniqId = (uniq) => {
  var hash = new MurmurHash3(uniq)
  return ('00000000' + hash.result().toString(16)).substr(-8)
}

const resize = (input, output, size, blur) => {
  let outputName = output
  const ext = output.split('.').pop()
  const fileName = output.split('/').pop().replace(`.${ext}`, '')
  const fullName = `${fileName}.${ext}`

  try {
    let image = sharp(input)
      .resize(size, null, {
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
      outputName = outputName.replace(fullName, `${fileName}-w${size}.${ext}`)
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

    const srcset = []
    srcset.push(`${resize(input, output, 460)} 460w`)
    srcset.push(`${resize(input, output, 650)} 650w`)
    srcset.push(`${resize(input, output, 1300)} 1300w`)

    const src = resize(input, output, 100, true)

    node.type = 'html'
    node.value = `<responsive-image src="${src}" srcset="${srcset.join(', ')}" title="${node.title}" alt="${node.alt}"></responsive-image>`
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
