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
    <div class="chat-list">
      <template
        v-for="chat in chats"
        :key="chat.id"
      >
        <span>{{ chat.idUser }}</span>
        <p>{{ chat.message }}</p>
      </template>
    </div>

    <form class="pure-form" @submit.prevent="createGroupChat">
      <input type="text" v-model="currentMessage" />
      <button class="pure-button">Send</button>
    </form>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { defineComponent, onUnmounted } from 'vue'
import { DataModelGroup, DataModelGroupChat } from '@/typings'
import api from '@/lib/api'

type ComponentData = {
  group: DataModelGroup | null,
  chats: DataModelGroupChat[],
  currentMessage: string,
}

export default defineComponent({
  name: 'Home',

  props: {
    idGroup: String,
  },

  data: (): ComponentData => ({
    group: null,
    chats: [],
    currentMessage: '',
  }),

  computed: {
    ...mapState('auth', {
      user: 'user',
    }),
  },

  async created () {
    const results = await Promise.all([
      this.getGroup(),
      this.getGroupChats(),
    ])

    this.group = results[0]
    this.chats = results[1]

    api.service('groupChats').on('created', this.addChatToList)
  },

  beforeUnmount () {
    api.service('groupChats').removeListener('created', this.addChatToList)
  },

  methods: {
    async getGroup (): Promise<DataModelGroup> {
      return api.service('groups').get(this.idGroup)
    },

    async getGroupChats (): Promise<DataModelGroupChat[]> {
      return api.service('groupChats').find({
        query: {
          idGroup: this.idGroup,
        },
      })
    },

    async createGroupChat (): Promise<DataModelGroupChat> {
      return api.service('groupChats').create({
        idGroup: this.idGroup,
        idUser: this.user.id,
        message: this.currentMessage,
      })
    },

    addChatToList (chat: DataModelGroupChat): void {
      console.log('got the group chat add event', chat)
      this.chats.push(chat)
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

.chat-box {
  display: flex;
  flex-direction: column;
  gap: 3em;

  padding: 0.5em;

  border: 1px solid black;

  .chat-list {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5em 1em;

  }

  p {
    margin: 0;
  }
}
</style>
