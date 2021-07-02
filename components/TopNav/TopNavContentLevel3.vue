<template>
  <top-nav-shell class="flex">
    <ul>
      <li
        class="group"
        v-for="(level2, index2) in navigation.children"
        :key="level2.title"
      >
        <TopNavLink
          :to="getNearestURL(level2)"
          :level="2"
          style="/* min-width: 20rem */"
          class="p-4 font-normal text-gray-700 flex flex-col rounded-l level2 lg:min-w-20"
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
    <div class="bg-gray-200 rounded-r-sm">
      <ul
        v-for="(level2, index2) in navigation.children"
        :key="level2.title"
        :class="currentIndex2 !== index2 && 'overflow-hidden h-0'"
      >
        <li
          class="group"
          v-for="level3 in level2.children"
          :key="level3.title"
        >
          <TopNavLink
            :to="getNearestURL(level3)"
            :level="3"
            class="p-4 flex flex-col text-sm"
            style="min-width: 20rem"
          >
            <strong class="font-semibold group-hover:underline">{{
              level3.title
            }}</strong>
            <p v-if="level3.description" class="text-xs text-gray-700 font-normal pt-1">
              {{ level3.description }}
            </p>
          </TopNavLink>
        </li>
      </ul>
    </div>
  </top-nav-shell>
</template>

<script>
import helpers from '~/lib/helpers'

export default {
  props: {
    navigation: { type: Object, default: () => {} },
  },
  data: () => ({
    currentIndex2: 0,
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

