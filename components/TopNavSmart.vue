<template>
  <nav
    class="nav-main md:flex md:flex-wrap bg-white border-gray-300 fixed w-full z-50 md:h-auto"
  >
    <div class="w-full border-b border-gray-300 p-4">
      <div
        class="container m-auto flex flex-col lg:flex-row items-center relative"
      >
        <nuxt-link to="/" class="flex">
          <Logo
            class="flex items-center flex-shrink-0 flex-grow-0 text-white mr-6"
          />
        </nuxt-link>
        <ul class="md:flex pl-6 pt-1" @mouseleave="closeDelayed" mouseenter="clearDelay">
          <li class="relative" v-for="(level1, index1) in navigation" :key="level1.title">
            <TopNavLink
              :to="getNearestURL(level1)"
              class="level1 ont-medium tracking-wide hover:text-gray-900 lg:pb-3 px-4 lg:mt-0 relative"
              :class="activeMain === level1.title && 'font-bold'"
              @mouseenter.native="setCurrentIndex(index1)"
            >
              {{ level1.title }}
              <top-nav-arrow v-if="index1 === currentIndex && hasLevel2(level1)" />
            </TopNavLink>
            <ul
              class="md:hidden"
              v-if="level1.children && level1.children.length > 0"
            >
              <li v-for="level2 in level1.children" :key="level2.title">
                <TopNavLink :to="getNearestURL(level2)" class="text-sm">
                  {{ level2.title }}
                </TopNavLink>
                <ul v-if="level2.children && level2.children.length > 0">
                  <li v-for="level3 in level2.children" :key="level3.title">
                    <TopNavLink :to="getNearestURL(level2)" class="text-xs">
                      {{ level3.title }}
                    </TopNavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <transition name="fade">
              <div v-if="currentIndex === index1">
                <component
                  :is="navComp(navigation[index1])"
                  :navigation="navigation[index1]"
                />
              </div>
            </transition>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import TopNavContentLevel3 from '~/components/TopNav/TopNavContentLevel3.vue'
import TopNavContentLevel2 from '~/components/TopNav/TopNavContentLevel2.vue'
import TopNavContentLevel1 from '~/components/TopNav/TopNavContentLevel1.vue'

import helpers from '~/lib/helpers'

export default {
  components: {
    TopNavContentLevel3,
    TopNavContentLevel2,
    TopNavContentLevel1,
  },
  props: {
    navigation: { type: Array, default: () => [] },
    activeMain: { type: String, default: null },
  },
  data: () => ({
    currentIndex: null,
  }),
  watch: {
    '$route' (to, from) {
      this.currentIndex = null
    }
  },
  methods: {
    navComp(level1) {
      if (this.hasLevel3(level1)) {
        return 'TopNavContentLevel3'
      } else if (this.hasLevel2(level1)) {
        return 'TopNavContentLevel2'
      } else {
        return 'TopNavContentLevel1'
      }
    },
    clearDelay() {
      clearTimeout(this.closeDelay)
    },
    closeDelayed() {
      this.clearDelay()
      this.closeDelay = setTimeout(() => {
        this.setCurrentIndex(null)
      }, 150)
    },
    setCurrentIndex(index) {
      this.clearDelay()
      this.currentIndex = index
    },
    hasLevel2(level1) {
      return level1.children && level1.showInMainNavigation
    },
    hasLevel3(level1) {
      return (
        level1.children &&
        level1.children.filter((item) => item.children && item.showInMainNavigation)
          .length > 0
      )
    },
    getNearestURL: helpers.getNearestURL
  },
}
</script>

<style lang="css">
/* .nav-main .level1.link-active,
.nav-main .level1.link-parent-active  {
  @apply font-bold;
} */
</style>
