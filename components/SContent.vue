<template>
  <div class="c-content">
    <slot />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import SNavigation from '~/components/SNavigation.vue'

export default createComponent({
  name: 'SContent',

  components: {
    SNavigation
  }
})
</script>
