import { Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import { Application } from '@feathersjs/express'
import Database, { KnownModels } from './db'

export type ServiceOptions = {
  [key: string]: any,
  id?: string,
  model: KnownModels,
  paginate?: Record<any, unknown>,
}

type Data = {
  [key: string]: any,
} | Error

export class Service implements ServiceMethods<Data> {
  id: string
  app!: Application
  options!: ServiceOptions
  db!: Database
  model!: KnownModels

  constructor (options: ServiceOptions) {
    this.options = options
    this.id = options.id || 'id'
    this.model = this.options.model
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find (params: Params = {}): Promise<Data[] | Paginated<Data>> {
    const results = await this.db.find(this.model, params.query)

    return results.map((result: any) => ({ ...result }))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get (id: string, params?: Params): Promise<Data> {
    const result = await this.db.get(this.model, id)
    return { ...result }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create (data: Data, params?: Params): Promise<Data> {
    const result = await this.db.create(this.model, data)
    return { ...result }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update (id: string, data: Data, params?: Params): Promise<Data> {
    return data
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch (id: string, data: Data, params?: Params): Promise<Data> {
    if (id === null) return data

    const result = await this.db.patch(this.model, id, data)
    return { ...result }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove (id: string, params?: Params): Promise<Data> {
    const result = await this.db.remove(this.model, id)
    return { ...result }
  }

  setup (app: Application): void {
    this.app = app
    this.db = app.get('rethinkdb') as Database
  }
}

export default (options: ServiceOptions): Service => {
  return new Service(options)
}
