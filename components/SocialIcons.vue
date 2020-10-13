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
      <span aria-label class="sr-only">Youtube</span>
    </a>
    <a
      href="https://www.instagram.com/grenzen_sind_relativ/"
      rel="noopener"
      target="_blank"
      title="Instagram"
      class="flex ml-3 hover:text-red-700"
    >
      <IconInstagram class="h-5 w-5" />
      <span aria-label class="sr-only">Instagram</span>
    </a>
    <a
      href="https://www.facebook.com/grenzensindrelativ"
      rel="noopener"
      target="_blank"
      title="Facebook"
      class="flex ml-3 hover:text-blue-600"
    >
      <IconFB class="h-5 w-5" />
      <span aria-label class="sr-only">Facebook</span>
    </a>
    <a
      href="https://twitter.com/GSR_eV"
      rel="noopener"
      target="_blank"
      title="Twitter"
      class="flex ml-3 hover:text-blue-600"
    >
      <IconTwitter class="h-5 w-5" />
      <span aria-label class="sr-only">Twitter</span>
    </a>
  </div>
</template>

<script>
import IconYT from '~/static/svg/youtube.svg?inline'
import IconFB from '~/static/svg/facebook.svg?inline'
import IconTwitter from '~/static/svg/twitter.svg?inline'
import IconInstagram from '~/static/svg/instagram.svg?inline'

export default {
  components: {
    IconYT,
    IconFB,
    IconTwitter,
    IconInstagram,
  }
}
</script>
