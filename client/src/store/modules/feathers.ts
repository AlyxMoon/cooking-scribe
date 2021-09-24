import feathers, { Application } from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import authentication from '@feathersjs/authentication-client'

export type State = {
  client: Application,
  services: {
    users: 'users',
  },
}

export const state: State = {
  client: feathers()
    .configure(rest('http://localhost:3030').fetch)
    .configure(authentication({
      path: 'authentication',
    })),
  services: {
    users: 'users',
  },
}

export type ActionContext = {
  state: State,
}

export const actions = {
  login: ({ state }: ActionContext, options: Record<string, any>): any => {
    return state.client.authenticate({
      ...options,
      strategy: options.strategy || 'local',
    })
  },

  logout: ({ state }: ActionContext): any => {
    return state.client.logout()
  },
}

export const getters = {
  apiUsers: ({ client, services }: State): any => client.service(services.users),
}
