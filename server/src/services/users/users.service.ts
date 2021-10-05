import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import hooks from './users.hooks'

import feathersDbService, { Service, ServiceOptions } from '../../db/feathersDbService'

declare module '../../declarations' {
  interface ServiceTypes {
    'users': Service & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options: ServiceOptions = {
    paginate: app.get('paginate'),
    model: 'Users',
  }

  app.use('/users', feathersDbService(options))
  app.service('users').hooks(hooks)
}
