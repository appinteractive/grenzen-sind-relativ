<template>
  <nuxt-link v-if="to" :to="to">
    <slot />
  </nuxt-link>
  <div v-else class="inline cursor-pointer" aria-hidden="true">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    to: { type: [String, Object], default: null }
  }
}
</script>
