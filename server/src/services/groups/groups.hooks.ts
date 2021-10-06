import { fastJoin, ResolverMap } from 'feathers-hooks-common'

const groupResolvers: ResolverMap<any> = {
  joins: {
    users: () => async (group, context) => {
      group.users = await context.app.service('users').find({
        ...context.params,
        query: {
          idGroup: group.id,
        },
      })

      return group
    },
  },
}

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [fastJoin(groupResolvers)],
    get: [fastJoin(groupResolvers)],
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
