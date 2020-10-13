const visit = require('unist-util-visit')

async function visitor(node) {
  const url = node.url

  if (url.indexOf('#') >= 0 || url.indexOf('/') === 0) return

  try {
    // youtube regex from https://regexr.com/3akf5
    const [fullUrl, id1, id2, channel, username, search, id3] = url.match(
      /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/
    )
    let id
    if (id1) {
      id = id1.split('=').pop()
    } else if (id2) {
      id = id2.replace('/', '')
    } else if (id3) {
      id = id3.replace('/', '')
    }

    if (fullUrl && id) {
      node.type = 'html'
      node.value = `<youtube id="${id}"></youtube>`
    }
  } catch (err) {}
}

async function transformer(tree, file, done) {
  const embeds = []
  visit(tree, 'link', (node) => embeds.push(node))

  for (const node of embeds) {
    await visitor(node)
  }

  done()
}

function remarkEmbeds() {
  return transformer
}

module.exports = remarkEmbeds
