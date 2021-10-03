import { ActionContext } from 'vuex'
import { AuthenticationResult } from '@feathersjs/authentication'
import client from '@/lib/api'

export type CreateUserData = {
  email: string,
  username: string,
  password: string,
}

type State = Record<string, unknown>

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
  createUser: async (
    context: ModuleActionContent,
    data: CreateUserData,
  ): Promise<any> => {
    return client.service('users').create(data)
  },

  logout: async (): Promise<AuthenticationResult | null> => {
    return client.logout()
  },
}

export const mutations = {
}
