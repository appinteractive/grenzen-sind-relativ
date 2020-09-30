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

export default {
  getNearestURL,
  urlByPath
}
