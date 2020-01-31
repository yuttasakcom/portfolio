<template>
  <div>
    <div class="c-content__center">
      <s-page-title>{{ page.title }}</s-page-title>
      <div
        class="lead enter-fade-up enter-delay-1"
        v-html="page.introduction"
      />
    </div>

    <s-cases :cases="cases" />

    <div class="c-content__center">
      <div v-html="page.content" />
    </div>

    <s-clients :clients="clients" />

    <div class="c-content__center">
      <s-social />
    </div>
  </div>
</template>

<script lang="ts">
import { api } from '~/plugins/cms.ts'
import { createComponent, ref } from '@vue/composition-api'
import SCases from '~/components/SCases.vue'
import SClients from '~/components/SClients.vue'
import SLinkList from '~/components/SLinkList.vue'
import SLinkListItem from '~/components/SLinkListItem.vue'
import SPageTitle from '~/components/SPageTitle.vue'
import SSocial from '~/components/SSocial.vue'

export default createComponent({
  name: 'Work',

  components: {
    SCases,
    SClients,
    SLinkList,
    SLinkListItem,
    SSocial,
    SPageTitle
  },

  head() {
    return {
      title: 'Work'
    }
  },

  async asyncData() {
    const pages = await api('pages')
    const cases = await api('cases')
    const clients = await api('clients')

    return {
      page: pages.data.data.filter((page: any) => page.slug === 'work')[0],
      cases: cases.data.data.filter(
        (caseItem: any) => caseItem.status === 'published'
      ),
      clients: clients.data.data
    }
  }
})
</script>
