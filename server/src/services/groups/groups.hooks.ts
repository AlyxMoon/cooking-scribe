import { fastJoin, ResolverMap } from 'feathers-hooks-common'

const groupResolvers: ResolverMap<any> = {
  joins: {
    users: () => async (group, context) => {
      console.log('doing stuff!', group)
      group.users = await context.app.service('users').find({
        idGroup: group.id,
      })

      console.log('did we fast join?', group)

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
