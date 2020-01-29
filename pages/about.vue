<template>
  <div class="c-content__center">
    <s-page-title>{{ page.title }}</s-page-title>
    <div class="lead" v-html="page.introduction" />
    <div v-html="page.content" />
    <s-social />
  </div>
</template>

<script lang="ts">
import { api } from '~/plugins/cms'
import { createComponent, ref } from '@vue/composition-api'
import SPageTitle from '~/components/SPageTitle.vue'
import SSocial from '~/components/SSocial.vue'

export default createComponent({
  name: 'About',

  components: {
    SSocial,
    SPageTitle
  },

  head() {
    return {
      title: 'About'
    }
  },

  async asyncData() {
    const pages = await api('pages')

    return {
      page: pages.data.data.filter((page: any) => page.slug === 'about')[0]
    }
  }
})
</script>
