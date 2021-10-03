import { action, createModule } from 'vuex-class-component'
import client from '@/lib/api'

const VuexModule = createModule({
  namespaced: 'users',
  strict: true,
})

export type SignUpUserData = {
  email: string,
  username: string,
  password: string,
}

class UsersModule extends VuexModule {
  @action
  async createUser (data: SignUpUserData): Promise<any> {
    return client.service('users').create(data)
  }
}

export default UsersModule
