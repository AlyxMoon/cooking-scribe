import { ServiceAddons } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { Groups } from './groups.class'
import hooks from './groups.hooks'

declare module '../../declarations' {
  interface ServiceTypes {
    'groups': Groups & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate'),
  }

  app.use('/groups', new Groups(options, app))

  const service = app.service('groups')

  service.hooks(hooks)
}
