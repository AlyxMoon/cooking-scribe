import rethinkDB, { Connection, ConnectionOptions } from 'rethinkdb'
import thinkagain, { Document, Model, ThinkAgain } from 'thinkagain'

import models from './models'

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

  create = async (model: string, data: { [key: string]: any }): Promise<Document> => {
    if (!(model in this.models)) throw new Error(`This model does not exist: ${model}`)

    const newModel = new this.models[model](data)
    return newModel.saveAll()
  }
}

export default Database
