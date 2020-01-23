<template>
  <div>
    <s-page-title>{{ page.title }}</s-page-title>
    <div class="lead" v-html="page.introduction" />
    <s-link-list>
      <s-link-list-item
        :to="`work/${caseItem.slug}`"
        :subtitle="caseItem.subtitle"
        v-for="caseItem in cases"
        :key="caseItem.title"
      >
        {{ caseItem.title }}
      </s-link-list-item>
    </s-link-list>
    <div v-html="page.content" />

    <s-social />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { createComponent, ref } from '@vue/composition-api'
import SLinkList from '~/components/SLinkList.vue'
import SLinkListItem from '~/components/SLinkListItem.vue'
import SPageTitle from '~/components/SPageTitle.vue'
import SSocial from '~/components/SSocial.vue'
import { Route } from 'vue-router/types/'

declare module '@nuxt/types' {
  interface Context {
    $payloadURL(message: Route): string
  }
}

export default createComponent({
  name: 'Work',

  components: {
    SLinkList,
    SLinkListItem,
    SSocial,
    SPageTitle
  },

  head() {
    return {
      title: 'Work'
    }
  },

  async asyncData({ $payloadURL, route }) {
    if (process.static && process.client && $payloadURL) {
      return await axios.get($payloadURL(route))
    }

    const pages = await axios.get(
      'https://portfolio.simonwuyts.eu/portfolio/items/pages?fields=*.*'
    )
    const cases = await axios.get(
      'https://portfolio.simonwuyts.eu/portfolio/items/cases?fields=*.*'
    )

    return {
      page: pages.data.data.filter((page: any) => page.slug === 'work')[0],
      cases: cases.data.data
    }
  }
})
</script>
