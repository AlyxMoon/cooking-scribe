import { fastJoin, ResolverMap } from 'feathers-hooks-common'

const resolvers: ResolverMap<any> = {
  joins: {
    users: () => async (chat, context) => {
      chat.user = await context.app.service('users').get(chat.idUser)

      return chat
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
    find: [fastJoin(resolvers)],
    get: [fastJoin(resolvers)],
    create: [fastJoin(resolvers)],
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
