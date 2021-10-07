<template>
  <Navbar />

  <main>
    <router-view/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import apiClient from '@/lib/api'
import Navbar from '@/components/Navbar.vue'

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
  },

  async created () {
    try {
      apiClient.reAuthenticate()
    } catch (err) {}
  },
})
</script>

<style lang="scss">
main {
  padding: 1rem 2rem;
}
</style>
