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
          class="
            p-4
            font-normal
            text-gray-800
            flex flex-col
            rounded-l
            level2
            lg:min-w-20
          "
          :class="index2 === currentIndex2 && 'bg-gray-200 text-gray-900'"
          @mouseenter.native="setLevel2($event, index2)"
        >
          <span class="group-hover:underline">{{ level2.title }}</span>
          <!-- <p v-if="level2.description" class="text-xs text-gray-800">
            {{ level2.description }}
          </p> -->
        </TopNavLink>
      </li>
    </ul>
    <div class="bg-gray-200 rounded-r-sm">
      <ul
        v-for="(level2, index2) in navigation.children"
        :key="level2.title"
        :ref="`l-${index2}`"
        :class="currentIndex2 !== index2 && 'opacity-0 absolute pointer-events-none'"
        :style="h ? `height: ${h}px` : ''"
        :aria-hidden="currentIndex2 !== index2"
      >
        <li class="group" v-for="level3 in level2.children" :key="level3.title">
          <TopNavLink
            :to="getNearestURL(level3)"
            :level="3"
            class="p-4 flex flex-col text-sm"
            style="min-width: 20rem"
          >
            <strong class="font-semibold group-hover:underline">{{
              level3.title
            }}</strong>
            <p
              v-if="level3.description"
              class="text-xs text-gray-800 font-normal pt-1"
            >
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
    h: 0,
  }),
  mounted() {
    // get min height for level 2 > 3 menu items
    let max = 0;
    Object.keys(this.$refs).forEach((key) => {
      const h = this.$refs[key][0].offsetHeight;
      if (h > max) {
        max = h;
      }
    })
    this.h = max;
  },
  methods: {
    setLevel2(event, index2) {
      this.currentIndex2 = index2
    },
    getNearestURL: helpers.getNearestURL,
  },
}
</script>

<style lang="postcss">
.group .level2.link-active {
  @apply text-gray-800 font-semibold;
}
</style>
