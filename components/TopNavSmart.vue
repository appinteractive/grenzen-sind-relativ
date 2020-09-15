<template>
  <nav class="md:flex md:flex-wrap bg-white border border-gray-300 fixed w-full z-50 md:h-auto">
    <div class="w-full border-b border-gray-300 p-4" >
      <div class="container m-auto flex flex-col lg:flex-row items-center relative">
        <nuxt-link to="/" class="flex">
          <Logo class="flex items-center flex-shrink-0 flex-grow-0 text-white mr-6" />
        </nuxt-link>
        <ul class="flex pl-6 pt-1">
          <li v-for="level1 in navigation" :key="level1.title">
            <nuxt-link
              :to="level1.url"
              class="font-medium tracking-wide hover:text-gray-900 lg:pb-3 px-4 lg:mt-0"
            >
              {{ level1.title }}
            </nuxt-link>
            <ul class="md:hidden" v-if="level1.children && level1.children.length > 0">
               <li v-for="level2 in level1.children" :key="level2.title">
                <nuxt-link
                  :to="level2.url"
                  class="text-sm"
                >
                  {{ level2.title }}
                </nuxt-link>
                <ul v-if="level2.children && level2.children.length > 0">
                  <li v-for="level3 in level2.children" :key="level3.title">
                    <nuxt-link
                      :to="level2.url"
                      class="text-xs"
                    >
                      {{ level3.title }}
                    </nuxt-link>
                  </li>
                </ul>
               </li>
            </ul>
          </li>
        </ul>
        <div class="hidden md:flex absolute p-1 shadow-2xl rounded-md border top-0 left-0 mt-24 ml-64 bg-white ">
          <ul>
            <li class="group" v-for="(level2, index2) in navigation[1].children" :key="level2.title">
              <nuxt-link
                :to="level2.url"
                class="p-4 flex flex-col rounded-l"
                :class="index2 === currentIndex2 && 'bg-gray-200 text-gray-900'"
                @mouseenter.native="setLevel2($event, index2)"
                @mouseleave.native="resetLevel2($event, index2)"
              >
                <strong class="font-bold group-hover:underline">{{ level2.title }}</strong>
                <p class="text-xs text-gray-700">
                  Hier kommt eine kurze beschreibung
                </p>
              </nuxt-link>
            </li>
          </ul>
          <div class="bg-gray-200 rounded-r-sm">
            <ul
              v-for="(level2, index2) in navigation[1].children"
              :key="level2.title"
              :class="currentIndex2 !== index2 && 'overflow-hidden h-0'"
            >
              <li class="group" v-for="(level3, index3) in level2.children" :key="level3.title">
                <nuxt-link
                  :to="level3.url"
                  class="p-4 flex flex-col text-sm"
                >
                  <strong class="font-bold group-hover:underline">{{ level3.title }}</strong>
                  <p class="text-xs text-gray-700">
                    Hier kommt eine kurze beschreibung
                  </p>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    navigation: { type: Array, default: () => [] }
  },
  data: () => ({
    currentIndex2: 0,
    lastLevel2Pos: { x: null, y: null}
  }),
  methods: {
    setLevel2(event, index2) {
      // console.log('setLevel2', index2, event)
      setTimeout(() => {
        this.currentIndex2 = index2
      }, 0)
      // this.lastLevel2Pos = { x: event.clientX, y: event.clientY }
    },
    resetLevel2(event, index2) {
      // console.log('resetLevel2', index2)

      /* const offset = {
        x: this.lastLevel2Pos.x - event.clientX,
        y: this.lastLevel2Pos.y - event.clientY
      }
      const abort = -offset.x < Math.abs(offset.y)
      console.log(offset)
      console.log(abort) */

      /* if (abort) {
        event.preventDefault()
      } */
    }
  }
}
</script>
