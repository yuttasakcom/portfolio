<template>
  <div>
    <s-page-title>{{ page.title }}</s-page-title>
    <div class="lead" v-html="page.introduction" />
    <s-services :services="services" />
    <s-social />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { createComponent, ref } from '@vue/composition-api'
import SPageTitle from '~/components/SPageTitle.vue'
import SSocial from '~/components/SSocial.vue'
import SServices from '@/components/SServices.vue'
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

  async asyncData({ $payloadURL, route }) {
    if (process.static && process.client && $payloadURL) {
      return await axios.get($payloadURL(route))
    }

    const services = await axios.get('https://cms.simonwuyts.eu/services.json')
    const pages = await axios.get('https://cms.simonwuyts.eu/pages.json')

    return {
      services: services.data.data,
      page: pages.data.data.filter((page: any) => page.slug === 'home')[0]
    }
  }
})
</script>

<style lang="scss">
.link-vue,
.link-react {
  margin-left: 2.2rem;
  position: relative;
  white-space: nowrap;

  &:before {
    background: url('/images/vue.svg') no-repeat center center;
    background-size: contain;
    content: '';
    height: 1.6rem;
    left: -2.2rem;
    position: absolute;
    top: calc(50% - 0.8rem);
    width: 1.8rem;
  }
}

.link-react:before {
  background-image: url('/images/react.svg');
}
</style>
