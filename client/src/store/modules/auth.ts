import { action, createModule, mutation } from 'vuex-class-component'
import client from '@/lib/api'

const VuexModule = createModule({
  namespaced: 'auth',
  strict: true,
})

export type AuthenticationStrategies = 'local' | 'jwt' | 'oauth'

export type LoginData = {
  email: string,
  password: string,
  strategy?: AuthenticationStrategies,
}

export type UserData = {
  id: string,
  email: string,
  username: string,
  password?: string,
}

export type AuthenticationCreatedEventData = {
  accessToken: string,
  authentication: {
    accessToken: string,
    payload: Record<string, number | string>,
    strategy: AuthenticationStrategies,
  },
  user: UserData,
}

class AuthModule extends VuexModule {
  user: UserData | null = null

  constructor () {
    super()

    this.registerEventListeners()
  }

  registerEventListeners (): void {
    client.authentication.service.on('created', (data: AuthenticationCreatedEventData) => {
      this.setUser(data.user)
    })
  }

  get isLoggedIn (): boolean {
    return !!this.user
  }

  @action
  async login (data: LoginData): Promise<any> {
    const result = await client.authenticate({
      ...data,
      strategy: data.strategy || 'local',
    })

    // console.log('heyo', result)
    // console.log(this.setUser)
    // this.setUser(result.user)

    return result
  }

  @action
  async logout (): Promise<any> {
    return client.logout()
  }

  @mutation setUser (user: UserData | null): void {
    console.log('------ running mutation', this.user)
    this.user = user
    console.log('------ updated mutation', this.user)
  }
}

export default AuthModule
