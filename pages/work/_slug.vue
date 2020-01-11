<template>
  <div>
    <img
      :src="caseItem.coverImage.url"
      :alt="caseItem.coverImage.title"
      class="c-cover"
      v-if="caseItem.coverImage !== null"
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
          v-if="item.tagUrl !== ''"
          class="c-tags__label"
          :href="item.tagUrl"
          target="_blank"
        >
          {{ item.label }}
        </a>
        <span v-else class="c-tags__label">
          {{ item.label }}
        </span>
      </li>
    </ul>
    <div v-html="caseItem.mainContent" />
    <s-social />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
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

  async asyncData({ $payloadURL, route, params }) {
    if (process.static && process.client && $payloadURL) {
      return await axios.get($payloadURL(route))
    }

    const cases = await axios.get('https://cms.simonwuyts.eu/cases.json')

    return {
      caseItem: cases.data.data.filter(
        (caseItem: any) => caseItem.slug === params.slug
      )[0]
    }
  }
})
</script>

<style lang="scss">
.c-tags {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.c-tags__item {
  margin: 0 0.8rem 0.8rem 0;
}

.c-tags__label {
  background: var(--gray-100);
  border-radius: 0.4rem;
  color: var(--gray-500);
  display: inline-flex;
  font-size: 1.4rem;
  padding: 0 0.8rem;
  transition: all 0.1s linear;
  white-space: nowrap;
}

a.c-tags__label:hover {
  background-color: var(--blue-500);
  border: 0;
  color: #fff;
}

.lead + .c-tags {
  margin-top: -2.4rem;
}
</style>
