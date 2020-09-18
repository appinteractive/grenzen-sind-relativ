<template>
  <nav class="w-1/3 pr-4">
    <ul>
      <li v-for="item in subMenu" :key="item.url">
        <nuxt-link
          v-if="item.url"
          :to="item.url"
          class="block p-2 text-gray-600 hover:text-gray-800 hover:underline rounded"
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
</template>

<script>
export default {
  props: {
    subMenu: { type: Array, required: true },
  },
}
</script>
