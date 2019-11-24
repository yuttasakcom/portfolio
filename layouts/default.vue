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
@import '../assets/scss/reset.scss';
@import '../assets/scss/generic.scss';

.c-main {
  background: #fff;
  padding: 3.2rem 3.2rem 9.2rem;
}

@media (min-width: 53em) {
  .c-main {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 120rem;
    min-height: 100%;
    padding: 4rem 4rem 7.2rem;
    width: calc(100vw - 6.4rem);
  }
}
</style>
