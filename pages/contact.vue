<template>
  <div>
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
import { Route } from 'vue-router/types/'

declare module '@nuxt/types' {
  interface Context {
    $payloadURL(message: Route): string
  }
}

export default createComponent({
  name: 'Contact',

  components: {
    SSocial,
    SPageTitle
  },

  head() {
    return {
      title: 'Contact'
    }
  },

  async asyncData() {
    const pages = await api('pages')

    return {
      page: pages.data.data.filter((page: any) => page.slug === 'contact')[0]
    }
  }
})
</script>
