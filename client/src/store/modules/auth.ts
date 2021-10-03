import { action, createModule } from 'vuex-class-component'
import client from '@/lib/api'

const VuexModule = createModule({
  namespaced: 'auth',
  strict: true,
})

class AuthModule extends VuexModule {
  @action
  async login (options: Record<string, any> = {}): Promise<any> {
    return client.authenticate({
      ...options,
      strategy: options.strategy || 'local',
    })
  }

  @action
  async logout (): Promise<any> {
    return client.logout()
  }
}

export default AuthModule
