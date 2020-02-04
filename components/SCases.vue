<template>
  <div class="c-cases">
    <nuxt-link
      class="c-case enter-fade-up"
      :class="`enter-delay-${index + 2}`"
      v-for="(item, index) in cases"
      :key="item.id"
      :to="`/work/${item.slug}`"
      :style="{
        background: `linear-gradient(to bottom, ${
          getBackgroundColors(item.color)[0]
        }, ${getBackgroundColors(item.color)[1]})`
      }"
    >
      <div
        class="c-case__image"
        :style="{
          'background-image': `url('https://s3.eu-west-3.amazonaws.com/simonwuyts-portfolio/thumbnails/w848,h848,fcontain,q80/${item.cover.filename_disk}')`
        }"
        v-if="item.cover"
      />
      <div class="c-case__info" :style="{ background: item.color }">
        <div class="c-case__title">{{ item.title }}</div>
        <div class="c-case__subtitle">{{ item.subtitle }}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import Color from 'color'

export default createComponent({
  name: 'SCases',

  props: {
    cases: Array
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
