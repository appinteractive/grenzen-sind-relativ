export default async ({ store, route }) => {
  await store.dispatch('navigation/init', route)
}
