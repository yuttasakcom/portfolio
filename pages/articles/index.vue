<template>
  <div class="c-content__center">
    <s-page-title>{{ page.title }}</s-page-title>
    <div
      class="lead enter-fade-up enter-delay-1"
      v-html="page.introduction"
      v-if="page.introduction"
    />
    <div
      class="enter-fade-up enter-delay-1"
      v-html="page.content"
      v-if="page.content"
    />
    <s-link-list>
      <s-link-list-item
        :class="`enter-fade-up enter-delay-${index + 1}`"
        :to="`articles/${article.slug}`"
        :subtitle="formatDate(article.date)"
        v-for="(article, index) in articles"
        :key="article.id"
      >
        {{ article.title }}
      </s-link-list-item>
    </s-link-list>
    <s-social />
  </div>
</template>

<script lang="ts">
import { api, getLocal } from '~/plugins/cms'
import { format } from 'date-fns'
import { createComponent, ref } from '@vue/composition-api'
import SLinkList from '~/components/SLinkList.vue'
import SLinkListItem from '~/components/SLinkListItem.vue'
import SPageTitle from '~/components/SPageTitle.vue'
import SSocial from '~/components/SSocial.vue'

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
    if (process.static && process.client) {
      const url = $payloadURL(route)
      return await getLocal($payloadURL(route))
    }

    const [pages, articles] = await Promise.all([api('pages'), api('articles')])

    return {
      page: pages.data.data.filter((page: any) => page.slug === 'articles')[0],
      articles: articles.data.data
        .filter((article: any) => article.status === 'published')
        .map((article: any) => {
          return {
            title: article.title,
            date: article.date,
            slug: article.slug,
            id: article.id
          }
        })
        .sort((a, b) => {
          a = new Date(a.date)
          b = new Date(b.date)
          return a > b ? -1 : a < b ? 1 : 0
        })
    }
  },

  methods: {
    formatDate(date) {
      return format(new Date(date), 'MMMM d, yyyy')
    }
  }
})
</script>
