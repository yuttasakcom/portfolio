<template>
  <div>
    <s-page-title>{{ page.title }}</s-page-title>
    <div class="lead" v-html="page.introduction" />
    <div v-html="page.mainContent" />
    <div class="c-cases">
      <nuxt-link
        class="c-case"
        v-for="caseItem in cases"
        :key="caseItem.title"
        :to="`work/${caseItem.slug}`"
      >
        <div
          class="c-case__cover"
          :style="{
            backgroundImage: `url('${caseItem.coverImage.url}')`
          }"
          v-if="caseItem.coverImage"
        />
        <div class="c-case__title">
          {{ caseItem.title }}
        </div>
      </nuxt-link>
    </div>
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
  name: 'Work',

  components: {
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

    const pages = await axios.get('https://cms.simonwuyts.eu/pages.json')
    const cases = await axios.get('https://cms.simonwuyts.eu/cases.json')

    return {
      page: pages.data.data.filter((page: any) => page.slug === 'work')[0],
      cases: cases.data.data
    }
  }
})
</script>

<style lang="scss">
.c-case {
  border: 0;
  display: block;
  margin-bottom: 4rem;

  &:hover {
    border: 0 !important;
  }
}

.c-case__cover {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0.4rem;
  height: 0;
  overflow: hidden;
  padding-bottom: 48%;
  transition: transform 0.3s ease-in-out;
}

.c-case__title {
  color: var(--gray-900);
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.4rem;
  margin-top: 2.4rem;
}
</style>
