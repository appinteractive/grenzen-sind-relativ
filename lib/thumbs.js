const resize = async (input, output, originalSize, outputSize, blur) => {
  if (originalSize < outputSize && !blur) return null

  const sharp = require('sharp')
  const fs = require('fs')

  let outputName = output
  const ext = output.split('.').pop()
  const fileName = output.split('/').pop().replace(`.${ext}`, '')
  const fullName = `${fileName}.${ext}`

  if (blur) {
    outputName = outputName.replace(fullName, `${fileName}-blurred.${ext.toLowerCase()}`)
  } else {
    outputName = outputName.replace(fullName, `${fileName}-w${outputSize}.${ext.toLowerCase()}`)
  }

  const doIt = !fs.existsSync(outputName) || fs.statSync(outputName).mtime > fs.statSync(input).mtime
  if (!doIt) {
    console.log('creating thumbnail')
    return blur ? outputName : outputName.split('/static').pop()
  }

  try {
    let image = sharp(input.trim())
      .resize(outputSize, null, {
        withoutEnlargement: true
      })
      .toFormat(ext.toLowerCase(), {
        quality: 90,
        progressive: !blur
      })

    blur && image.blur(5)

    if (blur) {
      await image.toFile(outputName)
      return outputName
    } else {
      image.toFile(outputName)
      return outputName.split('/static').pop()
    }
  } catch (err) {
    console.log('ERROR', err.message, input)
  }
}

const createThumbnails = async (url) => {
  const fs = require('fs')
  const { resolve } = require('path')
  const sizeOf = require('image-size');
  const { uniqId } = require('./helpers')
  const mkdirp = require('mkdirp')
  mkdirp.sync(`${__dirname}/../static/thumbs`)

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
    await resize(input, output, sizeMax, sizeMax),
    await resize(input, output, sizeMax, 460),
    await resize(input, output, sizeMax, 700),
    await resize(input, output, sizeMax, 1024),
    await resize(input, output, sizeMax, 2048)
  ].filter(item => !!item)

  const srcset = []
  if (images.length == 0 && !!images[0]) srcset.push(``)
  if (images.length > 1 && !!images[1]) srcset.push(`${images[0]} ${sizeMax}w`)
  if (images.length > 1 && !!images[1]) srcset.push(`${images[0]} 460w`)
  if (images.length > 2 && !!images[2]) srcset.push(`${images[1]} 700w`)
  if (images.length > 3 && !!images[3]) srcset.push(`${images[2]} 1024w`)
  if (images.length > 4 && !!images[4]) srcset.push(`${images[3]} 2048w`)

  const srcsetString = srcset.join(', ')

  const placeholder = await resize(input, output, sizeMax, 24, true)

  let base64 = null
  if (fs.existsSync(placeholder)) {
    const buff = fs.readFileSync(placeholder, {encoding: 'base64'})
    base64 = `data:image/${ext};base64,${buff}`
  }

  return {
    ratio,
    base64,
    srcsetString
  }
}

const api = {
  resize,
  createThumbnails,
}

module.exports = api
