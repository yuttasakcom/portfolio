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
          class="c-case__inner"
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

    const pages = await axios.get('https://cms.simonwuyts.com/pages.json')
    const cases = await axios.get('https://cms.simonwuyts.com/cases.json')

    return {
      page: pages.data.data.filter((page: any) => page.slug === 'work')[0],
      cases: cases.data.data
    }
  }
})
</script>

<style lang="scss">
.c-cases {
  display: grid;
  grid-gap: 2.4rem;
  grid-template-columns: 1fr 1fr;
  margin: 0 8rem;
}

.c-case {
  background: linear-gradient(to bottom, var(--gray-100), var(--gray-100));
  border: 0;
  border-radius: 0.4rem;
  display: block;
  height: 0;
  overflow: hidden;
  padding-bottom: 74%;
  position: relative;

  &:hover {
    border: 0 !important;
  }
}

.c-case__inner {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  bottom: 1.6rem;
  left: 1.6rem;
  position: absolute;
  right: 1.6rem;
  top: 1.6rem;
  transition: transform 0.3s ease-in-out;
}

.c-case__title {
  background-color: rgba(var(--gray-900), 0.85);
  bottom: 0;
  color: #fff;
  font: normal 1.6rem/2.4rem 'adelle-sans', sans-serif;
  left: 0;
  padding: 1.6rem;
  position: absolute;
  right: 0;
  text-align: center;
  transition: background-color 0.3s ease-in-out;
  -webkit-font-smoothing: antialiased;
}

.c-case:hover {
  .c-case__inner {
    transform: scale(1.05);
  }

  .c-case__title {
    background-color: rgba(var(--blue-500), 0.9);
  }
}

@media (max-width: 53em) {
  .c-cases {
    display: block;
    margin: 0;
  }

  .c-case {
    margin-bottom: 2.4rem;
  }
}
</style>
