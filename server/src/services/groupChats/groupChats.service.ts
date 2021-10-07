import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import hooks from './groupChats.hooks'

import feathersDbService, { Service, ServiceOptions } from '../../db/feathersDbService'

declare module '../../declarations' {
  interface ServiceTypes {
    'groupChats': Service & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options: ServiceOptions = {
    paginate: app.get('paginate'),
    model: 'GroupChats',
  }

  app.use('/groupChats', feathersDbService(options))
  app.service('groupChats').hooks(hooks)
}
