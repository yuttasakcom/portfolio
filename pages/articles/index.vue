<template>
  <div class="c-content__center">
    <s-page-title>{{ page.title }}</s-page-title>
    <div class="lead" v-html="page.introduction" v-if="page.introduction" />
    <div v-html="page.content" v-if="page.content" />
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
import { api } from '~/plugins/cms'
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

  async asyncData() {
    const pages = await api('pages')
    const articles = await api('articles')

    return {
      page: pages.data.data.filter((page: any) => page.slug === 'articles')[0],
      articles: articles.data.data
        .filter((article: any) => article.status === 'published')
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
