<template>
  <nav class="breadcrumbs">
    <ul class="flex pb-8">
      <li
        v-for="(breadCrumb, depth) in breadCrumbs"
        :key="breadCrumb.title"
        class="flex items-center"
      >
        <svg
          class="w-4 h-4 text-gray-600"
          v-if="depth > 0"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
        <nuxt-link
          v-if="breadCrumb.url"
          :to="breadCrumb.url"
          class="block p-2 text-gray-500 font-normal hover:text-gray-800 hover:underline rounded"
          style="font-weight: normal"
        >
          {{ breadCrumb.title }}
        </nuxt-link>
        <span
          v-else-if="!breadCrumb.showInMainNavigation"
          class="block p-2 text-gray-500 font-normal rounded"
          style="font-weight: normal"
        >
          {{ breadCrumb.title }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    breadCrumbs: { type: Array, required: true },
  },
}
</script>
