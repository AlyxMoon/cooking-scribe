<template>
  <h1>Users</h1>

  <table class="pure-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Username</th>
        <th>Email</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user of users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>
          <button
            class="pure-button"
            @click="removeUser(user.id)"
          >Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DataModelUser } from '@/typings'
import api from '@/lib/api'

type ComponentData = {
  users: DataModelUser[],
}

export default defineComponent({
  name: 'Home',

  data: (): ComponentData => ({
    users: [],
  }),

  async created () {
    this.users = await this.getUsers()
  },

  methods: {
    async getUsers (): Promise<DataModelUser[]> {
      return api.service('users').find()
    },

    async removeUser (id: string): Promise<DataModelUser> {
      this.users = this.users.filter(user => user.id !== id)
      return api.service('users').remove(id)
    },
  },
})
</script>

<style lang="scss" scoped>

</style>
