<template>
  <nuxt-link
    :to="to"
    class="font-medium tracking-wide hover:text-gray-900 border-b p-2 lg:pb-3 mr-3 lg:mt-0 -mb-px"
    :class="[
      active && 'border-gray-800 font-bold text-gray-800 tracking-wide',
      !active && 'border-transparent text-gray-600 tracking-wider'
    ]"
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
