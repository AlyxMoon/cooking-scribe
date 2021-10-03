<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
    <router-link :to="{ name: 'SignIn' }">Sign In</router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navbar',
})
</script>

<style scoped lang="scss">
nav {
  padding: 30px;

  display: flex;
  gap: 1em;

  background-color: #333;

  a {
    color: #EEE;
    font-weight: bold;
    text-decoration: none;

    &.router-link-exact-active {
      color: #3FB0AC;
    }
  }
}
</style>
