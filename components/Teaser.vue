<template>
  <div class="h-80 flex">
    <div
      class="absolute left-0 !top-0 right-0 h-full w-full flex items-center justify-center overflow-hidden bg-[#193861] bg-opacity-50"
      style="max-height: 400px"
    >
      <div class="teaser w-full h-full lg:mx-0 relative">
        <div
          class="h-full w-screen relative flex justify-between !items-end grid lg:grid-cols-3 pt-12 border"
        >
          <div class="lg:flex hidden h-full !justify-end !items-end min-w-3xl">
            <!-- <img
              src="/svg/teaser/left.svg"
              class="w-full flex !-mb-6 xl:!-mb-10 max-h-20 w-full object-fill"
            /> -->
          </div>
          <div
            class="mx-8 xl:-mx-px max-w-2xl !px-8 lg:!px-0 !justify-start self-start"
          >
            <slot />
            <div class="flex gap-2">
              <NuxtLink
                class="font-medium tracking-wide flex-1 justify-center bg-[#193861] !text-white !font-bold rounded-md !no-underline flex px-4 py-2.5 relative"
                to="/ueber-uns/mission-und-vision"
                >Mehr Erfahren</NuxtLink
              >
              <NuxtLink
                class="font-medium tracking-wide flex-1 justify-center bg-[#4F96D9] !text-white !font-bold rounded-md !no-underline flex px-4 py-2.5 relative"
                to="/spenden"
                >Spenden</NuxtLink
              >
            </div>
          </div>
          <div
            class="lg:flex hidden !w-full !h-full relative"
          >
            <!-- <LineRight class="!w-full !h-64 flex border" /> -->
            <!-- <img
              src="/svg/teaser/right.svg?inline"
              class="!w-full object-fill border"
            /> -->
          </div>
          <div
            class="absolute w-screen h-20 bottom-0 left-0 right-0 isolate z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern
                  :id="refId"
                  x="0"
                  y="0"
                  width="1125"
                  height="117"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    fill="#F3F4F6"
                    d="M0 70.5c17 0 28-.5 56-6.5s94.5-26.5 134-37.5 85.755-13.948 164.5 14c58.376 20.72 161.123 25.341 207.998 13.533C609.373 42.227 655.625 23.314 702.5 25.5c46.875 2.188 94.374 26.347 141.249 30.852 46.875 4.677 93.75-23.306 140.626-20.99C1033.97 38 1074.5 70.5 1125 70.5V117H0V70.5z"
                  />
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                :fill="`url(#${refId})`"
              ></rect>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineRight from '~/static/svg/teaser/right.svg?inline'

export default {
  components: {
    LineRight,
  },
  data() {
    return {
      refId: this.id || `line-id-${Math.round(Math.random() * 100000)}`,
    }
  },
}
</script>

<style lang="postcss">
.prose .teaser h2,
.prose .teaser p {
  @apply !text-left text-white;
}
</style>
