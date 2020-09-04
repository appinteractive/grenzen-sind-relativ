<template>
  <nav class="flex items-center justify-between flex-wrap bg-white border border-gray-300 fixed w-full z-50">
    <div class="w-full border-b border-gray-300 p-6 pb-0">
      <div class="container m-auto flex items-baseline">
        <nuxt-link to="/" class="flex">
          <Logo class="flex items-center flex-shrink-0 flex-grow-0 text-white mr-6" />
        </nuxt-link>
        <div class="block lg:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700 hover:text-white hover:border-white"
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto items-baseline bottom-0">
          <div class="lg:flex-grow">
            <LinkMain
              v-for="nav in navigation"
              :key="nav.url"
              :active="nav.url === navigation[currentMain].url"
              :to="nav.url"
              v-html="nav.title"
            />
          </div>
          <div>
            <a
              href="#"
              class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >Spenden</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full items-baseline p-3 bg-gray-100" v-if="navigation[currentMain].children">
      <div class="container m-auto">
        <LinkSub
          v-for="nav in navigation[currentMain].children"
          :key="nav.url"
          :active="navigation[currentMain].children.length && nav.url === navigation[currentMain].children[currentSub].url"
          :to="nav.url"
          v-html="nav.title"
        />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    open: { type: Boolean, default: false },
    currentMain: { type: Number, default: 0 },
    currentSub: { type: Number, default: 4 },
    navigation: { type: Array, default: () => [] }
  },
  mounted() {
    console.log(this.navigation)
  }
}
</script>
