import { formatISO } from 'date-fns'
import { Model, ThinkAgain } from 'thinkagain'

export default (thinkagain: ThinkAgain): Model => {
  return thinkagain.createModel('Groups', {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
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
