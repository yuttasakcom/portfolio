<template>
  <div>
    <s-page-title>{{ page.title }}</s-page-title>
    <div class="lead" v-html="page.introduction" v-if="page.introduction" />
    <div v-html="page.mainContent" v-if="page.mainContent" />
    <s-link-list>
      <s-link-list-item
        :to="`articles/${article.slug}`"
        :subtitle="formatDate(article.date)"
        v-for="article in articles"
        :key="article.id"
      >
        {{ article.title }}
      </s-link-list-item>
    </s-link-list>
    <s-social />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { format } from 'date-fns'
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
  name: 'Articles',

  components: {
    SLinkList,
    SLinkListItem,
    SSocial,
    SPageTitle
  },

  head() {
    return {
      title: 'Articles'
    }
  },

  async asyncData({ $payloadURL, route }) {
    if (process.static && process.client && $payloadURL) {
      return await axios.get($payloadURL(route))
    }

    const pages = await axios.get('https://cms.simonwuyts.eu/pages.json')
    const articles = await axios.get(
      'https://portfolio.simonwuyts.eu/portfolio/items/articles?fields=*.*'
    )

    return {
      page: pages.data.data.filter((page: any) => page.slug === 'articles')[0],
      articles: articles.data.data
    }
  },

  methods: {
    formatDate(date) {
      return format(new Date(date), 'MMMM d, yyyy')
    }
  }
})
</script>
