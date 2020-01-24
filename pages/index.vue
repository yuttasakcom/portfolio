<template>
  <div>
    <s-page-title>{{ page.title }}</s-page-title>
    <div class="lead" v-html="page.introduction" />
    <s-services :services="services" />
    <s-social />
  </div>
</template>

<script lang="ts">
import { api } from '~/plugins/cms'
import { createComponent, ref } from '@vue/composition-api'
import SPageTitle from '~/components/SPageTitle.vue'
import SSocial from '~/components/SSocial.vue'
import SServices from '~/components/SServices.vue'
import { Route } from 'vue-router/types/'

declare module '@nuxt/types' {
  interface Context {
    $payloadURL(message: Route): string
  }
}

export default createComponent({
  name: 'Index',

  components: {
    SSocial,
    SPageTitle,
    SServices
  },

  head() {
    return {
      title: 'Home'
    }
  },

  async asyncData() {
    const services = await api('services')
    const pages = await api('pages')

    return {
      services: services.data.data,
      page: pages.data.data.filter((page: any) => page.slug === 'home')[0]
    }
  }
})
</script>
