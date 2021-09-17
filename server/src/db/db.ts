import rethinkDB, { Connection, ConnectionOptions } from 'rethinkdb'
import thinkagain from 'thinkagain'

import models from './models'

class Database {
  thinkagain: any
  models: any[] = []

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
      this.models.push(model(this.thinkagain))
    }
  }

  create = async (model: string, data: { [key: string]: any }): Promise<any> => {
    const newModel = new this.models[0](data)
    const result = await newModel.saveAll()
    return result
  }
}

export default Database
