import { Application } from '../declarations'
import { ConnectionOptions } from 'rethinkdb'

import Database from './db'

export interface DatabaseType extends Database {}

export default (app: Application): void => {
  const config = app.get('database') as ConnectionOptions

  app.set('rethinkdb', new Database(config))
}
