import { createStore, Store } from 'vuex'
import { AuthenticationResult } from '@feathersjs/authentication'

import client from '@/lib/api'
import * as authModule from './modules/auth'
import * as usersModule from './modules/users'

export const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule,
    users: usersModule,
  },

  plugins: [
    (store: Store<Record<string, unknown>>): void => {
      client.authentication.service.on('created', (data: AuthenticationResult) => {
        store.commit('auth/setUser', data.user)
      })

      client.authentication.service.on('removed', () => {
        store.commit('auth/clearUser')
      })
    },
  ],
})
