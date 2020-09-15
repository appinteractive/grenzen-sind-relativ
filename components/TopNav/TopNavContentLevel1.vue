<script>
export default {
  props: {
    navigation: { type: [Object, null], default: () => {} }
  },
  render() {
    return this.$slots
  },
}
</script>
