<template>
  <top-nav-shell class="flex">
    <ul>
      <li
        class="group flex-shrink-0 flex-grow"
        v-for="(level2, index2) in navigation.children"
        :key="level2.title"
      >
        <TopNavLink
          :to="getNearestURL(level2)"
          :level="2"
          class="font-normal text-gray-700 p-4 flex flex-col rounded level2"
          style="min-width: 20rem"
          :class="index2 === currentIndex2 && 'bg-gray-200 text-gray-900'"
          @mouseenter.native="setLevel2($event, index2)"
        >
          <span class="group-hover:underline">{{
            level2.title
          }}</span>
          <!-- <p v-if="level2.description" class="text-xs text-gray-700">
            {{ level2.description }}
          </p> -->
        </TopNavLink>
      </li>
    </ul>
  </top-nav-shell>
</template>

<script>
import helpers from '~/lib/helpers'

export default {
  props: {
    navigation: { type: Object, default: () => {} }
  },
  data: () => ({
    currentIndex2: null,
  }),
  methods: {
    setLevel2(event, index2) {
      this.currentIndex2 = index2
    },
    getNearestURL: helpers.getNearestURL
  },
}
</script>

<style lang="postcss">
.group .level2.link-active {
  @apply text-gray-800 font-semibold;
}
</style>
