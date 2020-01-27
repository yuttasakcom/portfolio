<template>
  <div class="c-main">
    <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
      <filter id="titleFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.04"
          numOctaves="50"
          seed="50"
          result="turbulence"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="20"
          result="displacementMap"
        />
      </filter>
    </svg>
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
