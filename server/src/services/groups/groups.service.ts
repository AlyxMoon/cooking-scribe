import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import hooks from './groups.hooks'

import feathersDbService, { Service, ServiceOptions } from '../../db/feathersDbService'

declare module '../../declarations' {
  interface ServiceTypes {
    'groups': Service & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options: ServiceOptions = {
    paginate: app.get('paginate'),
    model: 'Groups',
  }

  app.use('/groups', feathersDbService(options))
  app.service('groups').hooks(hooks)
}
