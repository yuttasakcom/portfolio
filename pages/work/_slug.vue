<template>
  <div>
    <img
      :src="caseItem.cover.data.url"
      :alt="caseItem.title"
      class="c-cover"
      v-if="caseItem.cover"
    />
    <s-page-title> {{ caseItem.title }} </s-page-title>
    <div class="lead" v-html="caseItem.introduction" />
    <ul class="c-tags">
      <li
        v-for="item in caseItem.techStack"
        :key="item.label"
        class="c-tags__item"
      >
        <a
          v-if="item.link !== ''"
          class="c-tags__label"
          :href="item.link"
          target="_blank"
        >
          {{ item.label }}
        </a>
        <span v-else class="c-tags__label">
          {{ item.label }}
        </span>
      </li>
    </ul>
    <div v-html="caseItem.content" />
    <s-social />
  </div>
</template>

<script lang="ts">
import { api } from '~/plugins/cms'
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
  name: 'Case',

  components: {
    SSocial,
    SPageTitle
  },

  head(this: any) {
    return {
      title: this.caseItem.title
    }
  },

  async asyncData({ params }) {
    const cases = await api('cases')

    return {
      caseItem: cases.data.data.filter(
        (caseItem: any) => caseItem.slug === params.slug
      )[0]
    }
  }
})
</script>
