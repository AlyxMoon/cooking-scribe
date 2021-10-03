/* eslint-disable-next-line */
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { UserData } from '../store/modules/auth'

declare module '@vue/runtime-core' {

  interface State {
    [key: string]: any,
    auth: {
      user: UserData,
    },
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
