import { NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import { Application } from '../../declarations'

interface Data {
  id: string,
  username: string,
  email: string,
  password?: string,
  updatedAt?: string,
  createdAt?: string,
}

interface ServiceOptions {
  id?: string
}

export class Users implements ServiceMethods<Data> {
  id = 'users'
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    if (!options.id) options.id = 'id'

    this.options = options
    this.app = app
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find (params?: Params): Promise<Data[] | Paginated<Data>> {
    return []
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
    return this.app.get('rethinkdb').create('User', data)
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
