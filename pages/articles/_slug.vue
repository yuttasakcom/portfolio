<template>
  <div class="c-content__center">
    <div class="c-date">{{ formatDate(article.date) }}</div>
    <s-page-title> {{ article.title }} </s-page-title>
    <div class="lead" v-html="article.introduction" />
    <s-tags :tags="article.tags" />
    <div v-html="article.content" />
    <s-social />
  </div>
</template>

<script lang="ts">
import { api } from '~/plugins/cms'
import { format } from 'date-fns'
import { highlightAll } from 'prismjs'
import 'prism-theme-night-owl/style.min.css'
import { createComponent, onMounted } from '@vue/composition-api'
import SPageTitle from '~/components/SPageTitle.vue'
import SSocial from '~/components/SSocial.vue'
import STags from '~/components/STags.vue'

export default createComponent({
  name: 'Article',

  components: {
    SSocial,
    SPageTitle,
    STags
  },

  head(this: any) {
    return {
      title: this.article.title
    }
  },

  async asyncData({ params }) {
    const articles = await api('articles')

    return {
      article: articles.data.data.filter(
        (article: any) => article.slug === params.slug
      )[0]
    }
  },

  setup() {
    const formatDate = date => {
      return format(new Date(date), 'MMMM d, yyyy')
    }

    onMounted(() => {
      highlightAll()
    })

    return {
      formatDate
    }
  }
})
</script>
