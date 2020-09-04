<template>
  <nuxt-link
    :to="to"
    class="block lg:inline-block lg:mt-0 tracking-wide text-sm hover:text-gray-900 px-2 pb-3 mr-3 -mb-4 border-b"
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
