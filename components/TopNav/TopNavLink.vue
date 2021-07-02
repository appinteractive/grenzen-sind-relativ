<template>
  <router-link
    v-if="to"
    v-slot="{ href, isActive, navigate }"
    class="flex cursor-pointer"
    tag="div"
    :to="to"
    :custom="true"
  >
    <a
      role="link"
      :href="href"
      :class="[
        isActive || isActiveDeep
          ? 'text-gray-900 font-semibold'
          : 'text-gray-500 hover:text-primary-700',
      ]"
      @click="navigate"
    >
      <slot />
    </a>
  </router-link>
  <div v-else class="inline cursor-pointer" role="link">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    to: { type: [String, Object], default: null },
    level: { type: Number, default: undefined },
  },
  computed: {
    isActiveDeep() {
      const pathItems = this.$route.fullPath.split('/')
      const current = pathItems.pop()
      const path = pathItems.join('/')
      const root = this.to
        .split('/')
        .slice(1, this.level + 1)
        .join('/')

      if (this.level < 3 && path.includes(root)) {
        return true
      }
      return false
    },
  },
}
</script>
