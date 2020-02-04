<template>
  <div>
    <div class="c-cover" v-if="caseItem.cover">
      <div
        class="c-cover__background"
        :style="{
          background: `linear-gradient(to bottom, ${
            getBackgroundColors(caseItem.color)[0]
          }, ${getBackgroundColors(caseItem.color)[1]})`
        }"
      ></div>
      <img
        class="c-cover__image"
        :src="
          `https://s3.eu-west-3.amazonaws.com/simonwuyts-portfolio/thumbnails/w1280,h1280,fcontain,q80/${caseItem.cover.filename_disk}`
        "
        :alt="caseItem.title"
      />
    </div>

    <div class="c-content__center">
      <div class="c-date enter-fade-in enter-delay-1">
        {{ caseItem.subtitle }}
      </div>
      <s-page-title class="enter-delay-1"> {{ caseItem.title }} </s-page-title>
      <div
        class="lead enter-fade-up enter-delay-2"
        v-html="caseItem.introduction"
      />
      <s-tags :tags="caseItem.tech_stack" />
      <div v-html="caseItem.content" />
      <s-social :show-slogan="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { api, getLocal } from '~/plugins/cms'
import {
  createComponent,
  ref,
  onMounted,
  onUnmounted
} from '@vue/composition-api'
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
      title: this.caseItem.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.caseItem.introduction
        },
        {
          hid: 'ogdescription',
          property: 'og:description',
          content: this.article.introduction
        }
      ]
    }
  },

  async asyncData({ params, $payloadURL, route }) {
    if (process.static && process.client) {
      const url = $payloadURL(route)
      return await getLocal($payloadURL(route))
    }

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
