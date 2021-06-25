
const MurmurHash3 = require('imurmurhash')

const getNearestURL = (item) => {
  if (item.url) return item.url
  else if (item.children && item.children.length) {
    return getNearestURL(item.children[0])
  }

  return null
}

const urlByPath = (path) => {
  return path.replace(/content(.+)\.md/, '$1')
}

const uniqId = (uniq) => {
  var hash = new MurmurHash3(uniq)
  return ('00000000' + hash.result().toString(16)).substr(-8)
}

module.exports = {
  getNearestURL,
  urlByPath,
  uniqId,
}
