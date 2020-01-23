<template>
  <div class="c-main">
    <s-navigation />
    <s-content>
      <nuxt />
    </s-content>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import SContent from '~/components/SContent.vue'
import SNavigation from '~/components/SNavigation.vue'

export default createComponent({
  name: 'Default',
  components: {
    SContent,
    SNavigation
  }
})
</script>

<style lang="scss">
@import '../assets/scss/main.scss';
</style>
