<template>
  <h1>Groups</h1>

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
            @click="removeUser(group.id)"
          >Join</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
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

  async created () {
    this.groups = await this.getGroups()
  },

  methods: {
    async getGroups (): Promise<DataModelGroup[]> {
      return api.service('groups').find()
    },

    async joinGroup (id: string): Promise<DataModelGroup> {
      return api.service('groups').get(id)
    },
  },
})
</script>

<style lang="scss" scoped>

</style>
