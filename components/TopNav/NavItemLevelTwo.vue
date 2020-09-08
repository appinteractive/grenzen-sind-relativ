<template>
  <nuxt-link
    :to="to"
    class="block lg:inline-block lg:mt-0 text-sm hover:text-gray-900 hover:underline px-2 pt-1 pb-2 tracking-wide"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: [
    'to',
    'active'
  ],
}
</script>
