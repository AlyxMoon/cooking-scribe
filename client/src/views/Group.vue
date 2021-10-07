<template>
  <dl v-if="!!group">
    <dt>Group Name:</dt>
    <dd>{{ group.name }}</dd>

    <dt>Group Users</dt>
    <dd>
      <ul>
        <li v-for="user in group.users" :key="user.id">
          {{ user.username }}
        </li>
      </ul>
    </dd>
  </dl>

  <hr />

  <h3>Group chat</h3>
  <div class="chat-box">
    <ul></ul>

    <form @submit.prevent>
      <input type="text" />
      <button class="pure-button">Send</button>
    </form>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { defineComponent } from 'vue'
import { DataModelGroup } from '@/typings'
import api from '@/lib/api'

type ComponentData = {
  group: DataModelGroup | null,
}

export default defineComponent({
  name: 'Home',

  props: {
    idGroup: String,
  },

  data: (): ComponentData => ({
    group: null,
  }),

  computed: {
    ...mapState('auth', {
      user: 'user',
    }),
  },

  async created () {
    this.group = await this.getGroup()
  },

  methods: {
    async getGroup (): Promise<DataModelGroup> {
      return api.service('groups').get(this.idGroup)
    },
  },
})
</script>

<style lang="scss" scoped>
dl {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-start;
  gap: 1em;

  dt {
    font-weight: bold;
    text-align: right;
  }

  dd ul {
    margin: 0;
    padding: 0;
  }
}
</style>
