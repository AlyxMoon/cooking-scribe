import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import authentication from '@feathersjs/authentication-client'

const client = feathers()
  .configure(rest('http://localhost:3030').fetch(fetch))
  .configure(authentication({
    path: 'authentication',
  }))

export default client
