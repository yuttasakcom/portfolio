<template>
  <div>
    <div
      class="c-cover"
      :style="{
        background: `linear-gradient(to bottom, ${
          getBackgroundColors(caseItem.color)[0]
        }, ${getBackgroundColors(caseItem.color)[1]})`
      }"
      v-if="caseItem.cover"
    >
      <img
        class="c-cover__image"
        :src="`${caseItem.cover.data.url}?key=casecover`"
        :alt="caseItem.title"
      />
    </div>

    <div class="c-content__center">
      <div class="c-date">{{ caseItem.subtitle }}</div>
      <s-page-title> {{ caseItem.title }} </s-page-title>
      <div class="lead" v-html="caseItem.introduction" />
      <s-tags :tags="caseItem.tech_stack" />
      <div v-html="caseItem.content" />
      <s-social />
    </div>
  </div>
</template>

<script lang="ts">
import { api } from '~/plugins/cms'
import { createComponent, ref } from '@vue/composition-api'
import Color from 'color'
import SPageTitle from '~/components/SPageTitle.vue'
import SSocial from '~/components/SSocial.vue'
import STags from '~/components/STags.vue'

export default createComponent({
  name: 'Case',

  components: {
    SSocial,
    SPageTitle,
    STags
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
  },

  setup() {
    const getBackgroundColors = (baseColor: string): string[] => {
      const parsedBaseColor = Color(baseColor)
      const parsedBackgroundColor1 = parsedBaseColor.mix(Color('#fff'), 0.9)
      const parsedBackgroundColor2 = parsedBaseColor.mix(Color('#fff'), 0.7)
      return [parsedBackgroundColor1.hex(), parsedBackgroundColor2.hex()]
    }
    return {
      getBackgroundColors
    }
  }
})
</script>
