import * as feathersAuthentication from '@feathersjs/authentication'
import * as authLocal from '@feathersjs/authentication-local'

import createAndAttachGroup from './hooks/createAndAttachGroup'
import removeAssociatedGroup from './hooks/removeAssociatedGroup'

const { authenticate } = feathersAuthentication.hooks
const { hashPassword, protect } = authLocal.hooks

export default {
  before: {
    all: [],
    find: [
      authenticate('jwt'),
    ],
    get: [
      authenticate('jwt'),
    ],
    create: [
      hashPassword('password'),
    ],
    update: [
      hashPassword('password'),
      authenticate('jwt'),
    ],
    patch: [
      hashPassword('password'),
      authenticate('jwt'),
    ],
    remove: [
      authenticate('jwt'),
    ],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [
      createAndAttachGroup(),
    ],
    update: [],
    patch: [],
    remove: [
      removeAssociatedGroup(),
    ],
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
