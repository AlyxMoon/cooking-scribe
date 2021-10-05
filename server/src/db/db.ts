import rethinkDB, { Connection, ConnectionOptions, Expression } from 'rethinkdb'
import thinkagain, { Document, Model, ThinkAgain } from 'thinkagain'

import models from './models'

type KnownModels = 'Users' | 'Groups'

class Database {
  config: ConnectionOptions
  connection!: Connection
  thinkagain: ThinkAgain
  models: {
    [key: string]: Model,
  } = {}

  constructor (config: ConnectionOptions) {
    this.config = config
    this.init(config)

    this.thinkagain = thinkagain(config)
    this.configureModels()
  }

  init = async (config: ConnectionOptions): Promise<Connection> => {
    this.connection = await rethinkDB.connect(config)
    return this.connection
  }

  configureModels = (): void => {
    for (const model of models) {
      const modelInstance = model(this.thinkagain)
      this.models[modelInstance._schema.id] = modelInstance
    }
  }

  validateUniqueFields = async (
    model: KnownModels,
    data: { [key: string]: any },
  ): Promise<string[]> => {
    const uniqueFields = this.models[model]._schema.uniqueFields
    if (!uniqueFields) return []

    const buildQuery = (field: string): Expression<boolean> => {
      return rethinkDB.db(this.config.db as string).table(model)
        .filter({ [field]: data[field] })
        .limit(1).count().eq(1)
    }

    return await uniqueFields.reduce(async (errorFields: string[], field: string) => {
      const fieldExists = await buildQuery(field).run(this.connection)
      return fieldExists ? (await errorFields).concat(field) : errorFields
    }, [])
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
    const uniqueFieldsWithErrors = await this.validateUniqueFields(model, data)
    if (uniqueFieldsWithErrors.length) {
      const fields = uniqueFieldsWithErrors.join(', ')
      throw new Error(`The following fields have values that would conflict: ${fields}`)
    }

    const newModel = new this.models[model](data)
    return newModel.saveAll()
  }

  patch = async (model: KnownModels, id: string, data: { [key: string]: any }): Promise<Document> => {
    const uniqueFieldsWithErrors = await this.validateUniqueFields(model, data)
    if (uniqueFieldsWithErrors.length) {
      const fields = uniqueFieldsWithErrors.join(', ')
      throw new Error(`The following fields have values that would conflict: ${fields}`)
    }

    // rethinkDB.db(this.config.db as string).table(model)
    //   .filter({ [field]: data[field] })
    //   .limit(1).count().eq(1)

    const modelToPatch = this.models[model].get(id)
    return modelToPatch.merge(data).saveAll()
  }
}

export default Database
