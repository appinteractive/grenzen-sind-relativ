<template>
  <nav
    class="md:flex md:flex-wrap bg-white border border-gray-300 fixed w-full z-50 overflow-y-auto md:h-auto"
    :class="open && 'h-screen'"
  >
    <div class="w-full border-b border-gray-300 p-6 pb-0" >
      <div class="container m-auto flex flex-col lg:flex-row items-baseline" @mouseleave="$emit('open', false)">
        <nuxt-link to="/" class="flex">
          <Logo class="flex items-center flex-shrink-0 flex-grow-0 text-white mr-6" />
        </nuxt-link>
        <div class="flex md:hidden absolute right-0 top-0 h-24 items-center mr-6 md:mt-8">
          <button
            class="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900"
            @click="$emit('open', !open)"
          >
            <span v-if="open" class="text-4xl font-light -mt-2 text-gray-600">&times;</span>
            <svg
              v-else
              class="fill-current h-5 w-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          class="w-full flex-grow flex"
          :class="!open && 'hidden md:block'"
        >
          <div class="flex-grow flex flex-row flex-wrap mb-4 sm:mb-0 md:mt-8 lg:mt-0 ">
            <div
              v-for="(nav1, index1) in navigation"
              :key="nav1.url"
              @click="handleOn(index1)"
              @mouseenter="handleOn(index1)"
              class="flex"
            >
              <NavItemLevelOne
                :active="nav1.url === navigation[activeTab].url"
                :to="nav1.url"
                v-html="nav1.title"
              />
            </div>
          </div>
          <!-- <div>
            <a
              href="#"
              class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >Spenden</a
            >
          </div> -->
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full bg-white" v-if="open && navigation[activeTab].children && navigation[activeTab].children.length">
      <div
        class="container m-auto flex flex-row flex-wrap p-3"
        :class="!hasLevel3(navigation[activeTab]) && 'hidden'"
      >
        <div
          v-for="nav2 in navigation[activeTab].children.filter((items) => items.children)"
          :key="nav2.url"
          class="flex w-full sm:w-1/2 lg:w-1/3 pb-4"
        >
          <div v-if="nav2.children" class="flex flex-col pr-2">
            <NavItemLevelTwo
              :active="navigation[activeTab].children.length"
              :to="nav2.url"
              class="font-medium text-gray-900"
              v-html="nav2.title"
            />
            <NavItemLevelThree
              v-for="nav3 in nav2.children"
              :key="nav3.title"
              :active="false"
              :to="nav3.url"
            >
              <span v-html="nav3.title" />
            </NavItemLevelThree>
          </div>
        </div>
      </div>
      <div
        class="flex items-start w-full"
        :class="hasLevel3(navigation[activeTab]) && 'bg-gray-100 border-t'"
      >
        <div class="container m-auto flex flex-col md:flex-row py-2 px-6 lg:px-4">
          <NavItemLevelTwo
            v-for="nav2 in navigation[activeTab].children.filter((items) => !items.children)"
            :key="nav2.url"
            :active="navigation[activeTab].children.length"
            :to="nav2.url"
            v-html="nav2.title"
            class="flex text-gray-700 mr-2"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    open: { type: Boolean, default: false },
    activeTab: { type: Number, default: 0 },
    navigation: { type: Array, default: () => [] }
  },
  data: () => ({
    lastIndex: null
  }),
  methods: {
    hasLevel3(level1) {
      return level1.children && level1.children.filter(item => item.children && item.children.length).length > 0
    },
    handleOn(index) {
      if (!this.lastIndex) {
        this.lastIndex = this.activeTab
      }
      clearTimeout(this.fallbackIndex)
      this.$emit('change-main', index)
    },
    handleOff() {
      if (this.lastIndex >= 0) {
        this.fallbackIndex = setTimeout(() => {
          this.$emit('change-main', this.lastIndex)
          this.lastIndex = null
        }, 50)
      }
    }
  }
}
</script>
