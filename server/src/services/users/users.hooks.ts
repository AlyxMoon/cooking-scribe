import { HookContext } from '@feathersjs/feathers'
import * as feathersAuthentication from '@feathersjs/authentication'
import * as local from '@feathersjs/authentication-local'

const { authenticate } = feathersAuthentication.hooks
const { hashPassword, protect } = local.hooks

export default {
  before: {
    all: [],
    find: [
      authenticate('jwt'),
      (context: HookContext): HookContext => {
        console.log('params', context.params.query)
        return context
      },
    ],
    get: [authenticate('jwt')],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [
      (context: HookContext): HookContext => {
        console.log('data', context.result)
        return context
      },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
