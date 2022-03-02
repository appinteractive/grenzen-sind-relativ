<template>
  <nav
    class="
      nav-main
      md:flex md:flex-wrap
      bg-white
      border-primary-200
      fixed
      w-full
      z-50
    "
    role="navigation"
    aria-label="Hauptnavigation"
  >
    <div
      class="
        w-full
        border-b border-primary-200
        p-4
        md:h-auto
        overflow-y-scroll
        md:overflow-y-visible
      "
      :class="isOpen && 'h-screen'"
    >
      <div
        class="
          container
          px-4
          lg:px-8
          mx-auto
          flex flex-col
          md:flex-row
          items-center
          relative
          h-full
        "
      >
        <div
          class="
            flex
            fixed
            bg-white
            z-10
            top-0
            left-0
            px-4
            py-4
            md:p-0
            border-b
            md:border-0 md:static
            w-full
            md:w-auto
            items-center
            justify-center
          "
        >
          <nuxt-link
            to="/"
            class="flex items-center self-center h-full lg:w-32"
            aria-label="Startseite"
          >
            <Logo
              class="flex flex-shrink-0 flex-grow-0 text-white mr-2 lg:mr-6"
              alt="Grenzen sind relativ e.V."
            />
          </nuxt-link>
          <social-icons
            class="
              absolute
              md:hidden
              right-0
              flex
              justify-end
              items-center
              p-4
              text-gray-700
            "
            aria-hidden="true"
          />
          <button
            class="flex appearance-none md:hidden absolute left-0 p-4"
            @click="isOpen = !isOpen"
            aria-label="Navigation öffnen"
          >
            <svg
              viewBox="0 0 16 16"
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-if="isOpen"
                fill-rule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
              <path
                v-else
                fill-rule="evenodd"
                d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
        <ul
          class="mt-12 md:mt-0 pt-1 flex-grow justify-center"
          @mouseleave="closeDelayed"
          mouseenter="clearDelay"
          aria-label="Seiten"
          role="menubar"
          :class="!isOpen ? 'sr-only md:not-sr-only flex' : 'pt-12 pb-24 px-8'"
        >
          <li
            class="relative"
            v-for="(level1, index1) in navigation"
            :key="level1.title"
          >
            <TopNavLink
              :to="getNearestURL(level1)"
              class="
                level1
                font-medium
                tracking-wide
                hover:text-primary-900
                flex
                py-2
                md:py-0 md:pt-2 md:px-4 md:pb-3 md:mt-0
                relative
              "
              :class="activeMain === level1.title && 'font-bold'"
              :level="1"
              role="menuitem"
              @mouseenter.native="setCurrentIndex(index1)"
            >
              {{ level1.title }}
              <top-nav-arrow
                v-if="index1 === currentIndex && hasLevel2(level1)"
              />
            </TopNavLink>
            <ul
              class="md:sr-only w-full pb-4 flex flex-col"
              v-if="level1.children && level1.children.length > 0"
            >
              <li v-for="level2 in level1.children" :key="level2.title">
                <TopNavLink
                  :to="getNearestURL(level2)"
                  :level="2"
                  class="text-sm flex px-4 py-1"
                >
                  {{ level2.title }}
                </TopNavLink>
                <ul
                  v-if="level2.children && level2.children.length > 0"
                  class="px-6 pb-2"
                >
                  <li v-for="level3 in level2.children" :key="level3.title">
                    <TopNavLink
                      :to="getNearestURL(level3)"
                      :level="3"
                      class="text-sm text-primary-700 flex flex-col py-1"
                    >
                      <div class="flex">
                        <arrow-right class="h-4 w-4 mr-1 flex-shrink-0" />
                        {{ level3.title }}
                      </div>
                      <!-- <ul v-if="level3 && level3.children && level3.children.length > 0" class="px-6 pb-2">
                        <li v-for="level4 in level3.children" :key="level4.title">
                          <TopNavLink :to="getNearestURL(level4)" :level="4" class="text-sm text-primary-700 flex py-1">
                            <arrow-return class="h-2 w-2 mr-2 flex-shrink-0" />
                            {{ level4.title }}
                          </TopNavLink>
                        </li>
                      </ul> -->
                    </TopNavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <transition name="fade-menu">
              <div v-if="currentIndex === index1" aria-hidden="true">
                <component
                  :is="navComp(navigation[index1])"
                  :navigation="navigation[index1]"
                />
              </div>
            </transition>
          </li>
        </ul>
        <social-icons
          class="
            sr-only
            lg:not-sr-only
            flex
            justify-end
            items-center
            w-32
            text-gray-700
          "
        />
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
    currentTitle: { type: String, default: null },
  },
  data: () => ({
    currentIndex: null,
    isOpen: false,
  }),
  watch: {
    $route(to, from) {
      this.currentIndex = null
      this.isOpen = false
    },
  },
  mounted() {
    let lastW = window.innerWidth
    this.listener = window.addEventListener('resize', () => {
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth
        this.isOpen = false
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener(this.listener)
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
        level1.children.filter(
          (item) => item.children && item.showInMainNavigation
        ).length > 0
      )
    },
    getNearestURL: helpers.getNearestURL,
  },
}
</script>

<style lang="postcss">
.nav-main .level1.link-active,
.nav-main .level1.link-parent-active {
  @apply font-bold text-primary-900;
}
</style>
