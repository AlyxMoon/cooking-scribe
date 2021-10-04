<template>
  <div class="page-sign-in">
    <form
      class="pure-form pure-form-stacked"
      @submit.prevent="handleLogin"
    >
      <fieldset>
        <label for="email">Email</label>
        <input type="email" v-model="user.email" />

        <label for="password">Password</label>
        <input type="password" v-model="user.password" />

        <button class="pure-button">Submit</button>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'Sign In',

  data: () => ({
    user: {
      email: 'email1@email.com',
      password: 'password',
    },
  }),

  methods: {
    ...mapActions('auth', ['login']),

    async handleLogin () {
      const { email, password } = this.user
      this.login({ email, password })
    },
  },
})
</script>

<style lang="scss" scoped>
form fieldset {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2em;

  padding: 1em;

  label {
    margin-top: 1em;
    margin-left: 0.5em;
    text-align: left;
  }

  input {
    padding: 0.3em 1em;
  }
}
</style>
