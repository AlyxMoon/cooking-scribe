import { Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
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
  id = 'id'
  app: Application
  options: ServiceOptions
  db: DatabaseType
  defaultModel: 'Users' = 'Users'

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options
    this.app = app
    this.db = app.get('rethinkdb') as DatabaseType
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find (params: Params = {}): Promise<Data[] | Paginated<Data>> {
    const results = await this.db.find(this.defaultModel, params.query)

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
    const result = await this.db.create(this.defaultModel, data)
    return { ...result }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update (id: string, data: Data, params?: Params): Promise<Data> {
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch (id: string, data: Data, params?: Params): Promise<Data> {
    if (id === null) return data

    const result = await this.db.patch(this.defaultModel, id, data)
    return { ...result }
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
