<template>
  <h1 class="c-title enter-fade-up">
    <div class="c-title__border">
      <span class="c-title__inner">
        <slot />
      </span>
    </div>
    <div class="c-title__text">
      <span>
        <slot />
      </span>
    </div>
  </h1>
</template>

<script lang="ts">
export default {
  name: 'SPageTitle'
}
</script>
