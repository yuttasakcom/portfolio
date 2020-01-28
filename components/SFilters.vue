<template functional>
  <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
    <filter id="titleFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.04"
        numOctaves="50"
        seed="50"
        result="turbulence"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="blur"
        scale="20"
        result="displacementMap"
      />
    </filter>
  </svg>
</template>

<script>
export default {
  name: 'SFilters'
}
</script>
