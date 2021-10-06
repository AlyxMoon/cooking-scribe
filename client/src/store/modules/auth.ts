import { ActionContext } from 'vuex'
import { AuthenticationResult } from '@feathersjs/authentication'
import client from '@/lib/api'

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

export type State = {
  user: UserData | null,
}

type ModuleActionContent = ActionContext<State, Record<string, unknown>>

export const namespaced = true

export const state: State = {
  user: null,
}

export const getters = {
  isLoggedIn: (state: State): boolean => {
    return !!state.user
  },
}

export const actions = {
  login: async (context: ModuleActionContent, data: LoginData): Promise<AuthenticationResult> => {
    const result = await client.authenticate({
      ...data,
      strategy: data.strategy || 'local',
    })

    return result
  },

  logout: async (): Promise<AuthenticationResult | null> => {
    return client.logout()
  },
}

export const mutations = {
  setUser: (state: State, user: UserData | null): void => {
    state.user = user
  },

  clearUser: (state: State): void => {
    state.user = null
  },
}
