import rethinkDB, { Connection, ConnectionOptions } from 'rethinkdb'
import thinkagain from 'thinkagain'

import models from './models'

class Database {
  thinkagain: any
  models: {
    [key: string]: any
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

  create = async (model: string, data: { [key: string]: any }): Promise<any> => {
    if (!(model in this.models)) throw new Error(`This model does not exist: ${model}`)

    const newModel = new this.models[model](data)
    return newModel.saveAll()
  }
}

export default Database
