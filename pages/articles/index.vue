<template>
  <div>
    <s-page-title>{{ page.title }}</s-page-title>
    <div class="lead" v-html="page.introduction" v-if="page.introduction" />
    <div v-html="page.mainContent" v-if="page.mainContent" />
    <div class="c-articles">
      <nuxt-link
        :to="`articles/${article.slug}`"
        class="c-article"
        v-for="article in articles"
        :key="article.id"
      >
        <div class="c-article__date">{{ formatDate(article.date) }}</div>
        <h2 class="c-article__title">{{ article.title }}</h2>
      </nuxt-link>
    </div>
    <s-social />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { format } from 'date-fns'
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
  name: 'Articles',

  components: {
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

    const pages = await axios.get('https://cms.simonwuyts.com/pages.json')
    const articles = await axios.get('https://cms.simonwuyts.com/articles.json')

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

<style lang="scss">
.c-articles {
  margin: 4rem 0;
}

.c-article {
  display: flex;
  margin-bottom: 2.4rem;

  &:hover {
    border: 0 !important;
  }
}

.c-article__date {
  color: var(--gray-400);
  flex: none;
  line-height: 2.8rem;
  width: 16rem;
}

.c-article__title {
  color: var(--gray-900);
  flex: 1 1 0;
  margin: 0 !important;
  transition: color 0.1s linear;
}

.c-article:hover .c-article__title {
  color: var(--blue-500);
}

@media (max-width: 32em) {
  .c-article {
    display: block;
  }
}
</style>
