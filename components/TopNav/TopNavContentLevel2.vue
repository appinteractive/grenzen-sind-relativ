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
          class="p-4 flex flex-col rounded"
          style="min-width: 20rem"
          :class="index2 === currentIndex2 && 'bg-gray-200 text-gray-900'"
          @mouseenter.native="setLevel2($event, index2)"
        >
          <strong class="font-medium group-hover:underline">{{
            level2.title
          }}</strong>
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
