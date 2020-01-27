<template>
  <nav class="c-navigation">
    <nuxt-link class="c-navigation__logo" to="/">
      <s-logo />
      <span class="sr-only">Home</span>
    </nuxt-link>
    <div class="c-navigation__left">
      <nuxt-link
        to="/"
        class="c-navigation__item"
        active-class="c-navigation__item--active"
        exact
      >
        Home
      </nuxt-link>
      <nuxt-link
        to="/work"
        class="c-navigation__item"
        active-class="c-navigation__item--active"
      >
        Work
      </nuxt-link>
      <nuxt-link
        to="/about"
        class="c-navigation__item"
        active-class="c-navigation__item--active"
        exact
      >
        About
      </nuxt-link>
      <nuxt-link
        to="/articles"
        class="c-navigation__item"
        active-class="c-navigation__item--active"
      >
        Articles
      </nuxt-link>
      <nuxt-link
        to="/contact"
        class="c-navigation__item"
        active-class="c-navigation__item--active"
        exact
      >
        Contact
      </nuxt-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import SLogo from '~/components/SLogo.vue'

export default createComponent({
  name: 'SNavigation',

  components: {
    SLogo
  },

  setup() {
    const nlPath = computed(() => `/nl/`)
    const enPath = computed(() => `/`)

    return {
      nlPath,
      enPath
    }
  }
})
</script>
