import { createStore } from 'vuex'
import { extractVuexModule } from 'vuex-class-component'

import authModule from './modules/auth'
import usersModule from './modules/users'

export const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ...extractVuexModule(authModule),
    ...extractVuexModule(usersModule),
  },
})
