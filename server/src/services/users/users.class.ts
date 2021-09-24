import { NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import { Application } from '../../declarations'
import { DatabaseType } from '../../db'

type Data = {
  id: string,
  username: string,
  email: string,
  password?: string,
  updatedAt?: string,
  createdAt?: string,
} | Error

interface ServiceOptions {
  paginate?: any;
}

export class Users implements ServiceMethods<Data> {
  id = 'users'
  app: Application
  options: ServiceOptions
  db: DatabaseType

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options
    this.app = app
    this.db = app.get('rethinkdb') as DatabaseType
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find (params: Params = {}): Promise<Data[] | Paginated<Data>> {
    console.log('I am in find now', params)
    const results = await this.db.find('User', params.query)

    return results.map((result: any) => ({ ...result }))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get (id: string, params?: Params): Promise<Data> {
    return {
      id,
      email: 'someone@example.com',
      username: 'some guy',
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create (data: Data, params?: Params): Promise<Data> {
    const result = await this.db.create('User', data)
    return { ...result }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update (id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch (id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove (id: string, params?: Params): Promise<Data> {
    return {
      id,
      email: 'someone@example.com',
      username: 'some guy',
    }
  }
}
