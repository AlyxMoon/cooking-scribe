import { createStore, Store } from 'vuex'
import { AuthenticationResult } from '@feathersjs/authentication'
import { DataModelUser } from '@/typings'

import client from '@/lib/api'
import * as authModule from './modules/auth'
import * as usersModule from './modules/users'

export type AppState = {
  auth: authModule.State,
  users: usersModule.State,
}

export const store = createStore<AppState>({
  modules: {
    auth: authModule,
    users: usersModule,
  },

  plugins: [
    (store: Store<AppState>): void => {
      client.on('login', (data: AuthenticationResult) => {
        store.commit('auth/setUser', data.user)
      })

      client.on('logout', () => {
        store.commit('auth/clearUser')
      })

      client.service('users').on('created', (data: any) => {
        console.log('something got created!', data)
      })

      client.service('users').on('patched', (data: DataModelUser) => {
        console.log('something got patched!', data)
        console.log(store.state)

        if (data.id === store.state.auth.user?.id) {
          store.commit('auth/setUser', data)
        }
      })

      client.service('users').on('removed', (data: any) => {
        console.log('something got removed!', data)
      })
    },
  ],
})
