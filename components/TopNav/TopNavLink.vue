<template>
  <nuxt-link v-if="to" :to="to" role="link">
    <slot />
  </nuxt-link>
  <div v-else class="inline cursor-pointer" role="link">
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
