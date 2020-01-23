<template>
  <div class="c-link-list" :class="{ 'c-link-list--grid': type === 'grid' }">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SLinkList',
  props: {
    type: String
  }
}
</script>
