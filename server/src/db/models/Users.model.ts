import { formatISO } from 'date-fns'
import { Model, ThinkAgain } from 'thinkagain'

export default (thinkagain: ThinkAgain): Model => {
  return thinkagain.createModel('Users', {
    type: 'object',
    properties: {
      id: { type: 'string' },
      idGroup: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      createdAt: {
        type: 'string',
        default: formatISO(new Date()),
      },
      updatedAt: {
        type: 'string',
        default: formatISO(new Date()),
      },
    },
    required: ['idGroup', 'username', 'email', 'password'],
    uniqueFields: ['username', 'email'],
  })
}
