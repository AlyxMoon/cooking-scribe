import { HookContext, HooksObject } from '@feathersjs/feathers'

const hooks: HooksObject<any> = {
  before: {
    all: [
      (context: HookContext): HookContext => {
        console.log(`heyo we are in a route | ${context.path} | ${context.method} | ${context.type}`)

        return context
      },
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [
      (context: HookContext): HookContext => {
        console.log(`heyo we are in a route | ${context.path} | ${context.method} | ${context.type}`)

        return context
      },
    ],
    find: [],
    get: [],
    create: [
    ],
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

export default hooks
