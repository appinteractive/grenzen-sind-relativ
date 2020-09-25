<template>
  <div>
    <h1>HELLO WORLD</h1>
    <slot v-id="this.$slots['default'].length > 0" />
  </div>
</template>

<script>

function getGalleryItem(tag, item) {
  if (!tag.tag) return
  // console.log('getGalleryItem', tag, item)
  if (tag.tag === 'img') {
    console.log('img')
    return { ...item, url: tag.src}
  }
  if (tag.tag === 'p') {
    console.log('p')
    return getGalleryItem(tag.children[0], item)
  }
  if (tag.tag === 'a') {
    console.log('a')
    return getGalleryItem(tag.children[0], { ...item, title: tag.title, link: tag.href })
  }

  return item
}

export default {
  mounted() {
    const items = []
    this.$slots['default']
      .forEach(tag => {
        items.push(getGalleryItem(tag, {
          title: null,
          url: null
        }))
      })

    /* .forEach(tag => {
      if (!tag) return
      if (tag.tag === 'img') {
        items.push()
      }
    }) */
    console.log('HELLO WORLD', items)
  }
}
</script>
