<template>
  <div>
    <a
      href="https://www.youtube.com/channel/UCvADF2ZMvSg5DonZ06Kf3KA"
      rel="noopener"
      target="_blank"
      title="Youtube"
      class="flex ml-3 hover:text-red-700"
    >
      <IconYT class="h-6 w-6" />
      <span aria-label class="hidden">Youtube</span>
    </a>
    <a
      href="https://www.facebook.com/grenzensindrelativ"
      rel="noopener"
      target="_blank"
      title="Facebook"
      class="flex ml-3 hover:text-blue-700"
    >
      <IconFB class="h-5 w-5" />
      <span aria-label class="hidden">Facebook</span>
    </a>
  </div>
</template>

<script>
import IconYT from '~/static/svg/youtube.svg?inline'
import IconFB from '~/static/svg/facebook.svg?inline'

export default {
  components: {
    IconYT,
    IconFB,
  }
}
</script>
