<template>
  <aside class="lg:w-56 lg:absolute h-full border mb-12 p-6 lg:p-0 bg-primary-100 lg:bg-transparent lg:border-transparent rounded">
    <nav
      class="-ml-1 lg:sticky top-32 pb-12"
      aria-label="Unternavigation"
      role="menu"
    >
      <ul>
        <li v-for="parent in subMenu" :key="parent.title" class="flex items-start flex-col pb-1">
          <div class="sub-nav_main flex">
            <arrow-right class="h-5 w-5 text-gray-800 mt-1 -mr-1 flex-shrink-0" aria-hidden="true" />
            <div
              class="w-full text-md"
              :class="currentTitle === parent.title && 'font-semibold'"
            >
              <nuxt-link
                :to="getNearestURL(parent)"
                class="block p-2 py-1 hover:text-gray-900 hover:underline rounded"
                :class="currentTitle === parent.title ? 'text-gray-900 ': 'text-gray-800'"
                role="menuitem"
              >
                {{ parent.title }}
              </nuxt-link>
            </div>
          </div>
          <ul v-if="currentTitle === parent.title" class="sub-nav_sub">
            <li v-for="item in parent.children" :key="item.url" class="flex items-start pr-6">
              <arrow-return class="h-4 w-4 text-gray-800 mt-1 pt-1 ml-4 flex-shrink-0" />
              <nuxt-link
                :to="getNearestURL(item)"
                class="block p-2 py-1 text-gray-800 text-sm hover:text-gray-900 hover:underline rounded"
                role="menuitem"
              >
                {{ item.title }}
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import helpers from '~/lib/helpers'

export default {
  props: {
    subMenu: { type: Array, required: true },
    parents: { type: Array, required: true },
    currentTitle: { type: String, required: true }
  },
  methods: {
    getNearestURL: helpers.getNearestURL
  }
}
</script>

<style lang="postcss">
.sub-nav_main .link-active {
  @apply text-primary-800 font-semibold;
}
.sub-nav_sub .link-active {
  @apply text-primary-800 font-semibold;
}
</style>
