<template>
  <top-nav-shell class="flex">
    <ul>
      <li
        class="group flex-shrink-0 flex-grow"
        v-for="(level2, index2) in navigation.children"
        :key="level2.title"
      >
        <TopNavLink
          :to="level2.url"
          class="p-4 flex flex-col rounded-l"
          style="min-width: 20rem"
        >
          <strong class="font-bold group-hover:underline">{{
            level2.title
          }}</strong>
          <p v-if="level2.description" class="text-xs text-gray-700">
            {{ level2.description }}
          </p>
        </TopNavLink>
      </li>
    </ul>
  </top-nav-shell>
</template>

<script>
export default {
  props: {
    navigation: { type: Object, default: () => {} }
  },
}
</script>
