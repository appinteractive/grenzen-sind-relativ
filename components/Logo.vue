<template>
  <div class="h-12 md:-my-4">
    <!-- <GSRLogoLong class="h-10 hidden lg:block" />
    <GSRLogoShort class="h-10 !lg:hidden" /> -->
    <GSRLogo class="fill-current h-12" />
  </div>
</template>

<script>
import GSRLogo from '~/static/svg/logo-wide.svg?inline'
import GSRLogoShort from '~/static/svg/GSR_Favico.svg?inline'

export default {
  components: {
    GSRLogo,
    GSRLogoShort,
  },
}
</script>
