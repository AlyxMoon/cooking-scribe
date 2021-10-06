import '@feathersjs/transport-commons'
import { HookContext } from '@feathersjs/feathers'
import { Application } from './declarations'

export default function (app: Application): void {
  if (typeof app.channel !== 'function') return

  app.on('connection', (connection: any): void => {
    console.log('got a connection', connection)
    app.channel('anonymous').join(connection)
  })

  app.on('login', (authResult: any, { connection }: any): void => {
    if (!connection) return

    const user = connection.user

    app.channel('anonymous').leave(connection)
    app.channel('authenticated').join(connection)
    app.channel(`groups/${user.idGroup}`).join(connection)
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.publish((data: any, hook: HookContext) => {
    console.log(data)

    return app.channel('authenticated')
  })

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
}
