<template>
  <div class="page-sign-up">
    {{ user1 }}
    <form
      class="pure-form pure-form-stacked"
      @submit.prevent="register"
    >
      <fieldset>
        <label for="email">Email</label>
        <input type="email" v-model="user.email" />

        <label for="username">Username</label>
        <input type="text" v-model="user.username" />

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
  name: 'SignUp',

  data: () => ({
    user: {
      email: 'email1@email.com',
      username: 'user1',
      password: 'password',
    },
  }),

  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions('users', ['createUser']),

    async register (): Promise<void> {
      try {
        await this.createUser({
          ...this.user,
        })

        await this.login({
          email: this.user.email,
          password: this.user.password,
        })
      } catch (error) {
        return console.error(error)
      }
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
