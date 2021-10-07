import { formatISO } from 'date-fns'
import { Model, ThinkAgain } from 'thinkagain'

export default (thinkagain: ThinkAgain): Model => {
  return thinkagain.createModel('GroupChats', {
    type: 'object',
    properties: {
      id: { type: 'string' },
      idGroup: { type: 'string' },
      idUser: { type: 'string' },
      message: { type: 'string' },
      createdAt: {
        type: 'string',
        default: formatISO(new Date()),
      },
      updatedAt: {
        type: 'string',
        default: formatISO(new Date()),
      },
    },
  })
}
