<template>
  <aside class="w-1/3 pr-4">
    <nav>
      <ul>
        <li v-for="item in subMenu" :key="item.url" class="flex items-start">
          <arrow-right class="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
          <nuxt-link
            v-if="item.url"
            :to="item.url"
            class="block p-2 py-1 text-gray-600 text-sm hover:text-gray-800 hover:underline rounded"
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
    </nav>
  </aside>
</template>

<script>
export default {
  props: {
    subMenu: { type: Array, required: true },
  },
}
</script>
