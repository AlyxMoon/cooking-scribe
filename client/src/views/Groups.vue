<template>
  <h1>Groups</h1>

  <div>
    Your Group: {{ userGroupName }}
  </div>

  <table class="pure-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>User Count</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="group of groups" :key="group.id">
        <td>{{ group.id }}</td>
        <td>{{ group.name }}</td>
        <td>{{ group.users?.length || 0 }}</td>
        <td>
          <button
            class="pure-button"
            @click="joinGroup(group.id)"
          >Join</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { defineComponent } from 'vue'
import { DataModelGroup } from '@/typings'
import api from '@/lib/api'

type ComponentData = {
  groups: DataModelGroup[],
}

export default defineComponent({
  name: 'Home',

  data: (): ComponentData => ({
    groups: [],
  }),

  computed: {
    ...mapState('auth', {
      user: 'user',
    }),

    userGroupName (): string {
      const group = this.groups.find(group => group.id === this.user?.idGroup)
      return group?.name || 'N/A'
    },
  },

  async created () {
    this.groups = await this.getGroups()
  },

  methods: {
    async getGroups (): Promise<DataModelGroup[]> {
      return api.service('groups').find()
    },

    async joinGroup (id: string): Promise<void> {
      try {
        const previousGroup = this.groups.find(group => group.id === this.user.idGroup)
        const nextGroup = this.groups.find(group => group.id === id)

        await api.service('users').patch(this.user.id, {
          idGroup: id,
        })

        if (previousGroup && previousGroup.users) {
          previousGroup.users = previousGroup.users
            .filter(user => user.id !== this.user.id)
        }

        if (nextGroup && nextGroup.users) {
          nextGroup.users.push(this.user)
        }
      } catch (err) {
        const error = err as Error
        console.error(error)
      }
    },
  },
})
</script>

<style lang="scss" scoped>

</style>
