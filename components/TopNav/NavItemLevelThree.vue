<template>
  <nuxt-link
    :to="to"
    class="flex flex-row relative lg:mt-0 tracking-wide text-xs hover:text-gray-900 hover:underline px-2 pb-1"
    :class="[
      active && 'border-gray-800 font-bold text-gray-800 tracking-wide',
      !active && 'border-transparent text-gray-700 tracking-wider'
    ]"
  >
    <svg class="fill-current w-3 h-3 mr-1 mt-px pt-px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
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
