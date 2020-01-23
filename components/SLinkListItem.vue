<template>
  <nuxt-link
    :to="to"
    class="c-link-list-item"
    :class="{ 'c-link-list-item--card': type === 'card' }"
  >
    <div class="c-link-list-item__subtitle">{{ subtitle }}</div>
    <h2 class="c-link-list-item__title"><slot /></h2>
  </nuxt-link>
</template>

<script lang="ts">
export default {
  name: 'SLinkListItem',
  props: {
    subtitle: String,
    to: [String, Object],
    type: String
  }
}
</script>
