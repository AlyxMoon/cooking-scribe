import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
// import rest from '@feathersjs/rest-client'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

const API_URL = 'http://localhost:3030'

const client = feathers()
  // .configure(rest(API_URL).fetch(fetch))
  .configure(socketio(io(API_URL)))
  .configure(authentication({
    path: 'authentication',
  }))

export default client
