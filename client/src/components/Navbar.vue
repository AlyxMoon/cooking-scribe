<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
    <router-link :to="{ name: 'SignIn' }">Sign In</router-link>
    <router-link :to="{ name: 'Users' }">Users</router-link>
    <router-link :to="{ name: 'Groups' }">Groups</router-link>
    <router-link
      v-if="isLoggedIn"
      :to="{ name: 'Group', params: { idGroup: user.idGroup } }"
    >Your Group</router-link>

    <div class="user-info">
      User: {{ isLoggedIn ? user.username : 'Not Logged In' }}

      <button class="pure-button" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default defineComponent({
  name: 'Navbar',

  computed: {
    ...mapState('auth', {
      user: 'user',
    }),
    ...mapGetters('auth', ['isLoggedIn']),
  },

  methods: {
    ...mapActions('auth', ['logout']),
  },
})
</script>

<style scoped lang="scss">
nav {
  padding: 1rem 30px;

  display: flex;
  align-items: center;
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

  .user-info {
    margin-left: auto;

    color: white;
    font-weight: bold;
  }
}
</style>
