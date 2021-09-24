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
import { mapGetters } from 'vuex'
// import { vxm } from '@/store'

type SignUpUserData = {
  email: string,
  username: string,
  password: string,
}

@Options({
  computed: {
    ...mapGetters('feathers', ['apiUsers']),
  },
})
export default class SignUp extends Vue {
  user: SignUpUserData = {
    email: 'email1@email.com',
    username: 'user1',
    password: 'password',
  }

  apiUsers: any

  async register (): Promise<void> {
    // console.log(vxm.feathers)
    // console.log(vxm.feathers.apiUsers)

    try {
      console.log(await this.apiUsers.create({
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
