import { action, createModule } from 'vuex-class-component'
import feathers, { Application } from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import authentication from '@feathersjs/authentication-client'

const VuexModule = createModule({
  namespaced: 'feathers',
  strict: false,
})

export type Services = {
  users: 'users'
}

class FeathersStore extends VuexModule {
  client: Application = feathers()
    .configure(rest('http://localhost:3030').fetch(fetch))
    .configure(authentication({
      path: 'authentication',
    }))

  services: Services = {
    users: 'users',
  }

  constructor () {
    super()

    console.log(this.client.service('users'))
  }

  get apiUsers (): any {
    return this.client.service(this.services.users)
  }

  @action
  async login (options: Record<string, any> = {}): Promise<any> {
    return this.client.authenticate({
      ...options,
      strategy: options.strategy || 'local',
    })
  }

  @action
  async logout (): Promise<any> {
    return this.client.logout()
  }
}

export default FeathersStore
