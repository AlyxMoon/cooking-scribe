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
import { mapActions, mapMutations, mapState } from 'vuex'

import { LoginData, UserData } from '@/store/modules/auth'
import { SignUpUserData } from '@/store/modules/users'

// @Options({

// })
// export default class SignUp extends Vue {
//   user1!: UserData
//   login!: (data: LoginData) => Promise<any>
//   createUser!: (data: SignUpUserData) => Promise<any>
//   setUser!: (data: UserData) => void

//   get testUser (): UserData {
//     // return this.$store.
//     return this.$store.state.auth.user
//   }

//   async register (): Promise<void> {
//     try {
//       const newUser = await this.createUser({
//         ...this.user,
//       })

//       // console.log(newUser)

//       const result = await this.login({
//         email: this.user.email,
//         password: this.user.password,
//       })

//       // console.log(result)
//       // console.log(this.user1)
//       // this.setUser({ username: 'whatdup', email: 'someemail', id: '1' })
//       console.log(this.$store.state.auth.user)
//       console.log(this.$store)
//       console.log(this.testUser)
//     } catch (error) {
//       return console.error(error)
//     }

//     // const result = await vxm.feathers.login({
//     //   email: this.user.email,
//     //   password: this.user.password,
//     // })

//     // console.log(result)
//   }
// }

// type ComponentData = {
//   user: SignUpUserData,
// }

export default defineComponent({
  name: 'SignUp',
  data: () => ({
    user: {
      email: 'email1@email.com',
      username: 'user1',
      password: 'password',
    },
  }),

  computed: {
    ...mapState('auth', {
      user1: 'user',
    }),
  },

  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions('users', ['createUser']),
    ...mapMutations('auth', ['setUser']),

    async register (): Promise<void> {
      try {
        const newUser = await this.createUser({
          ...this.user,
        })

        // console.log(newUser)

        const result = await this.login({
          email: this.user.email,
          password: this.user.password,
        })

        // console.log(result)
        // console.log(this.user1)
        // this.setUser({ username: 'whatdup', email: 'someemail', id: '1' })
        console.log(this.$store.state.auth.user)
        console.log(this.$store)
      } catch (error) {
        return console.error(error)
      }

      // const result = await vxm.feathers.login({
      //   email: this.user.email,
      //   password: this.user.password,
      // })

    // console.log(result)
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
