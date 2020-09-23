export default async function ({ redirect, $content, route }) {
  const files = await $content({ deep: true }).where({ alias: route.path }).only(['path', 'alias']).fetch()

  if (files.length && files.length === 1) {
    redirect(301, files[0].path)
  }
}
