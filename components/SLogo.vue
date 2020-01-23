<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="c-logo"
    viewBox="0 0 64 64"
    preserveAspectRatio="none"
  >
    <defs>
      <mask id="logoMask">
        <circle cx="32" cy="32" r="32" fill="#FFF" />
        <g stroke="#000" fill="none" stroke-linecap="round" stroke-width="2">
          <path
            class="c-logo__line"
            :class="{ 'c-logo__line--animating': isAnimating }"
            d="M44.963 26.545c.444-.505.46-1.256-.014-1.743l-5.854-6.037c-1.852-1.91-4.28-2.865-6.708-2.865s-4.856.955-6.708 2.865c-3.705 3.82-3.705 10.015 0 13.835l5.87 6.052c.243.23.548.348.851.348.302 0 .602-.118.838-.361l5.857-6.04 5.867-6.054z"
          />
          <path
            class="c-logo__line"
            :class="{ 'c-logo__line--animating': isAnimating }"
            d="M19.737 38.155c-.444.505-.46 1.256.014 1.743l5.854 6.037c1.852 1.91 4.28 2.865 6.708 2.865s4.856-.955 6.708-2.865c3.705-3.82 3.705-10.015 0-13.835l-5.87-6.052a1.246 1.246 0 0 0-.851-.348c-.302 0-.602.118-.838.361l-5.857 6.04-5.867 6.054z"
          />
        </g>
      </mask>
    </defs>
    <circle
      class="c-logo__circle"
      cx="32"
      cy="32"
      r="32"
      fill="currentColor"
      mask="url(#logoMask)"
    />
  </svg>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  name: 'SLogo',

  setup() {
    const isAnimating = ref(false)

    return {
      isAnimating
    }
  }
})
</script>
