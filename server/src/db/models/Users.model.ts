import { formatISO } from 'date-fns'

export default (thinkagain: any): any => {
  return thinkagain.createModel('User', {
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
  })
}
