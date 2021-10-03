<template>
  <Navbar />

  <main>
    <router-view/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/components/Navbar.vue'

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
  },
})
</script>

<style lang="scss">
main {
  padding: 1rem 2rem;
}
</style>
