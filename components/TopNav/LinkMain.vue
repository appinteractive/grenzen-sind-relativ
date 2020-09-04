<template>
  <nuxt-link
    :to="to"
    class="block lg:inline-block lg:mt-0 font-medium tracking-wide hover:text-gray-900 p-2 pb-3 mr-3 border-b -mb-px"
    :class="[
      active && 'border-gray-800 font-bold text-gray-800',
      !active && 'border-transparent text-gray-600 '
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
