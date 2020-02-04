<template>
  <div class="c-content__center">
    <s-page-title>{{ page.title }}</s-page-title>
    <div class="lead enter-fade-up enter-delay-1" v-html="page.introduction" />
    <s-services :services="services" />
    <s-social />
  </div>
</template>

<script lang="ts">
import { api, getLocal } from '~/plugins/cms'
import { createComponent, ref } from '@vue/composition-api'
import SPageTitle from '~/components/SPageTitle.vue'
import SSocial from '~/components/SSocial.vue'
import SServices from '~/components/SServices.vue'

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

  async asyncData({ $payloadURL, route }) {
    if (process.static && process.client) {
      const url = $payloadURL(route)
      return await getLocal($payloadURL(route))
    }

    const [pages, services] = await Promise.all([api('pages'), api('services')])

    return {
      services: services.data.data,
      page: pages.data.data.filter((page: any) => page.slug === 'home')[0]
    }
  }
})
</script>
