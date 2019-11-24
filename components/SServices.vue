<template>
  <div class="c-services">
    <div class="c-service" v-for="service in services">
      <div class="c-service__icon">
        <img :src="service.image" :alt="service.title" />
      </div>
      <div class="c-service__description">
        <h2>{{ service.title }}</h2>
        <div v-html="service.description" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SServices',
  props: {
    services: Array
  }
}
</script>

<style lang="scss">
.c-services {
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr 1fr;
}

.c-service {
  p:last-child {
    margin-bottom: 0;
  }
}

.c-service__icon {
  margin: 0 0 2.4rem;

  img {
    border: 0;
    display: block;
    margin: 0;
  }
}

@media (max-width: 53em) {
  .c-services {
    display: block;
  }

  .c-service {
    margin-bottom: 4rem;
  }
}
</style>
