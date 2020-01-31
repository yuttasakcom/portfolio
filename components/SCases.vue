<template>
  <div class="c-cases">
    <nuxt-link
      class="c-case"
      :class="{
        'c-case--featured': item.featured
      }"
      v-for="item in cases"
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
          'background-image': `url('${item.cover.data.url}?key=casethumb')`
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
