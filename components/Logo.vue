<template>
  <div class="h-10">
    <!-- <GSRLogoLong class="h-10 hidden lg:block" />
    <GSRLogoShort class="h-10 !lg:hidden" /> -->
    <GSRLogo class="fill-current h-10" />
  </div>
</template>

<script>
import GSRLogo from '~/static/svg/GSR_Logo_Simple.svg?inline'
import GSRLogoLong from '~/static/svg/logo-wide.svg?inline'
import GSRLogoShort from '~/static/svg/GSR_Favico.svg?inline'

export default {
  components: {
    GSRLogo,
    GSRLogoLong,
    GSRLogoShort,
  },
}
</script>
