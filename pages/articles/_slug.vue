<template>
  <div>
    <div class="c-date">{{ formatDate(article.date) }}</div>
    <s-page-title> {{ article.title }} </s-page-title>
    <div class="lead" v-html="article.introduction" />
    <div v-html="article.mainContent" />
    <s-social />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { format } from 'date-fns'
import { highlightAll } from 'prismjs'
import 'prism-theme-night-owl'
import { createComponent } from '@vue/composition-api'
import SPageTitle from '~/components/SPageTitle.vue'
import SSocial from '~/components/SSocial.vue'
import { Route } from 'vue-router/types/'

declare module '@nuxt/types' {
  interface Context {
    $payloadURL(message: Route): string
  }
}

export default createComponent({
  name: 'Article',

  components: {
    SSocial,
    SPageTitle
  },

  head(this: any) {
    return {
      title: this.article.title
    }
  },

  async asyncData({ $payloadURL, route, params }) {
    if (process.static && process.client && $payloadURL) {
      return await axios.get($payloadURL(route))
    }

    const articles = await axios.get('https://cms.simonwuyts.eu/articles.json')

    return {
      article: articles.data.data.filter(
        (article: any) => article.slug === params.slug
      )[0]
    }
  },

  methods: {
    formatDate(date) {
      return format(new Date(date), 'MMMM d, yyyy')
    }
  },

  mounted() {
    highlightAll()
  }
})
</script>

<style lang="scss"></style>