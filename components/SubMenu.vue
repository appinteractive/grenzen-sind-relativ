<template>
  <aside class="w-64 md:fixed">
    <nav class="-ml-1">
      <ul>
        <li v-for="parent in subMenu" :key="parent.title" class="flex items-start flex-col pb-1">
          <div class="sub-nav_main flex">
            <arrow-right class="h-5 w-5 text-gray-500 mt-1 -mr-1 flex-shrink-0" />
            <div
              class="w-full text-md"
              :class="currentTitle === parent.title && 'font-semibold'"
            >
              <nuxt-link
                v-if="parent.url"
                :to="parent.url"
                class="block p-2 py-1 hover:text-gray-800 hover:underline rounded"
                :class="currentTitle === parent.title ? 'text-gray-800 ': 'text-gray-600'"
              >
                {{ parent.title }}
              </nuxt-link>
              <span
                v-else
                class="block p-2 text-gray-400 line-through"
                style="font-weight: normal"
              >
                {{ parent.title }}
              </span>
            </div>
          </div>
          <ul v-if="currentTitle === parent.title" class="sub-nav_sub">
            <li v-for="item in parent.children" :key="item.url" class="flex items-start pr-6">
              <arrow-return class="h-4 w-4 text-gray-500 mt-1 pt-1 ml-4 flex-shrink-0" />
              <nuxt-link
                v-if="item.url"
                :to="item.url"
                class="block p-2 py-1 text-gray-700 text-sm hover:text-gray-800 hover:underline rounded"
              >
                {{ item.title }}
              </nuxt-link>
              <span
                v-else
                class="block p-2 text-gray-400 line-through"
                style="font-weight: normal"
              >
                {{ item.title }}
              </span>
            </li>
          </ul>
        </li>

      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  props: {
    subMenu: { type: Array, required: true },
    parents: { type: Array, required: true },
    currentTitle: { type: String, required: true }
  },
}
</script>

<style lang="css">
.sub-nav_main .link-active {
  @apply text-gray-800 font-semibold;
}
.sub-nav_sub .link-active {
  @apply text-gray-800 font-semibold;
}
</style>
