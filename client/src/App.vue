<template>
  <nav id="nav">
    <router-link to="/">Home</router-link> |
    <router-link :to="{ name: 'Signup' }">Sign Up</router-link>
  </nav>

  <div>
    <div>{{ user }}</div>
    <div v-if="isLoggedIn">
      User: {{ user.username }}
    </div>
    <div v-else>
      Not Logged In
    </div>
  </div>

  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { mapState, mapGetters, mapMutations } from 'vuex'

import { UserData } from './store/modules/auth'

@Options({
  computed: {
    ...mapState('auth', {
      user: 'user',
    }),
    ...mapGetters('auth', ['isLoggedIn']),
  },
  methods: {
    ...mapMutations('auth', ['setUser']),
  },
})
export default class App extends Vue {
  user!: UserData
  isLoggedIn!: boolean
  setUser!: (data: UserData) => void

  created (): void {
    console.log(this.user, this.isLoggedIn)
    this.setUser({ id: '123', username: 'hello', email: 'someguy@email.com' })
    console.log(this.user, this.isLoggedIn)
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
