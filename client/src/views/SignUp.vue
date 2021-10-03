<template>
  <div class="page-sign-up">
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
import { Options, Vue } from 'vue-class-component'
import { mapActions } from 'vuex'
import { SignUpUserData } from '@/store/modules/users'

@Options({
  methods: {
    ...mapActions('users', ['createUser']),
  },
})
export default class SignUp extends Vue {
  createUser!: (data: SignUpUserData) => Promise<any>

  user: SignUpUserData = {
    email: 'email1@email.com',
    username: 'user1',
    password: 'password',
  }

  async register (): Promise<void> {
    try {
      console.log(await this.createUser({
        ...this.user,
      }))
    } catch (error) {
      return console.error(error)
    }

    // const result = await vxm.feathers.login({
    //   email: this.user.email,
    //   password: this.user.password,
    // })

    // console.log(result)
  }
}
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
