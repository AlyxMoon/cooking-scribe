import rethinkDB, { Connection, ConnectionOptions, Expression, WriteResult } from 'rethinkdb'
import thinkagain, { Document, Model, ThinkAgain } from 'thinkagain'

import models from './models'

export type KnownModels = 'Users' | 'Groups'

/* eslint-disable camelcase */
interface RemoveResult extends WriteResult {
  changes: {
    new_val: Record<string, any> | null,
    old_val: Record<string, any> | null,
  }[],
}
/* eslint-enable camelcase */

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
      if (!(field in data)) return errorFields

      const fieldExists = await buildQuery(field).run(this.connection)
      return fieldExists ? (await errorFields).concat(field) : errorFields
    }, [])
  }

  get = async (
    model: KnownModels,
    id: string,
    filters: Record<string, any> = {},
  ): Promise<Document> => {
    return this.models[model].get(id).run()
  }

  find = async (
    model: KnownModels,
    filters: Record<string, any> = {},
  ): Promise<Document[]> => {
    const {
      $limit: limit,
      ...searchParams
    } = filters

    let query = this.models[model].filter(searchParams)
    if (limit) query = query.limit(limit)

    return (query.run() as Document[])
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

    const modelToPatch = await this.models[model].get(id).run()
    return modelToPatch.merge(data).saveAll()
  }

  remove = async (model: KnownModels, id: string): Promise<Document> => {
    try {
      const result = await rethinkDB.table(model).get(id).delete({
        returnChanges: true,
      }).run(this.connection) as RemoveResult

      return result.changes[0].old_val
    } catch (err) {
      const error = err as Error
      if (error.name === 'DocumentNotFoundError') {
        return {}
      }

      throw error
    }
  }
}

export default Database
