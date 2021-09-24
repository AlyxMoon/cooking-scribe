import { createStore } from 'vuex'
import { createProxy, extractVuexModule } from 'vuex-class-component'

import feathersModule from './modules/feathers'

export const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ...extractVuexModule(feathersModule),
  },
})

export const vxm = {
  feathers: createProxy(store, feathersModule),
}
