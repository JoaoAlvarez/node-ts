import express from 'express'
import cors from 'cors'

import routes from './routes'
import 'dotenv/config'
import morgan from 'morgan'
import DataBase from './configs/database'
import Logger from './middlewares/logger'

import notFound from './middlewares/not-found'
import serverError from './middlewares/server-error'

const LOG = new Logger('App')
class App {
  public express: express.Application

  public constructor () {
    LOG.logInfo('Iniciando app...')
    this.express = express()

    this.routes()
    this.middlewares()
    this.database()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(morgan('dev'))
    this.express.use(notFound)
    this.express.use(serverError)
  }

  private database (): void {
    DataBase.conectarMongoDB(this.express)
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
