<template>
  <ul class="c-tags" v-if="tags">
    <li v-for="(item, index) in tags" :key="`tag${index}`" class="c-tags__item">
      <template v-if="typeof item.link === 'string' && item.link !== ''">
        <a class="c-tags__label" :href="item.link" target="_blank">
          {{ setUpper(item.label) }}
        </a>
      </template>
      <span v-else class="c-tags__label">
        {{ item.label ? setUpper(item.label) : setUpper(item) }}
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'STags',

  props: {
    tags: Array
  },

  setup() {
    const setUpper = original => {
      return original.charAt(0).toUpperCase() + original.substring(1)
    }

    return {
      setUpper
    }
  }
})
</script>
