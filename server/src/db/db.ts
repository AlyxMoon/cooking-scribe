import rethinkDB, { Connection, ConnectionOptions } from 'rethinkdb'
import thinkagain, { Document, Model, ThinkAgain } from 'thinkagain'

import models from './models'

type KnownModels = 'Users' | 'Groups'

class Database {
  thinkagain: ThinkAgain
  models: {
    [key: string]: Model,
  } = {}

  constructor (config: ConnectionOptions) {
    this.init(config)

    this.thinkagain = thinkagain(config)
    this.configureModels()
  }

  init = (config: ConnectionOptions): Promise<Connection> => {
    return rethinkDB.connect(config)
  }

  configureModels = (): void => {
    for (const model of models) {
      const modelInstance = model(this.thinkagain)
      this.models[modelInstance._schema.id] = modelInstance
    }
  }

  find = async (model: KnownModels, filters: Record<string, any> = {}): Promise<Document[]> => {
    const {
      $limit: limit,
      ...searchParams
    } = (filters)

    const results: Document[] = []

    if (limit) {
      const documents = await this.models[model].filter(searchParams).limit(limit).run()
      results.push(...documents)
    } else {
      const documents = await this.models[model].filter(searchParams).run()
      results.push(...documents)
    }

    return results
  }

  create = async (model: KnownModels, data: { [key: string]: any }): Promise<Document> => {
    const newModel = new this.models[model](data)
    return newModel.saveAll()
  }
}

export default Database
