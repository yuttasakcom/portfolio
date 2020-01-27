<template>
  <div class="c-clients">
    <a
      :href="client.link"
      class="c-client"
      v-for="client in clients"
      :key="client.name"
    >
      <img
        :src="client.logo.data.url"
        :alt="client.name"
        class="c-client__logo"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'SClients',

  props: {
    clients: Array
  }
})
</script>
