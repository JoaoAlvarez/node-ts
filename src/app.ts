import express from 'express'
import cors from 'cors'

import routes from './routes'
import 'dotenv/config'
import DataBase from './configs/database'
import Logger from './middlewares/logger'

import notFound from './middlewares/not-found'
import serverError from './middlewares/server-error'
import bodyParser from 'body-parser'
import { configuration } from './configs/jwt-configuration'

const LOG = new Logger('App')
class App {
  public express: express.Application

  public constructor () {
    LOG.logInfo('Iniciando app...')
    this.express = express()

    this.middlewares()
    this.routes()
    this.database()
  }

  private middlewares (): void {
    bodyParser.json({ limit: '50mb' })
    this.express.use(bodyParser.json())
    this.express.use(cors())
  }

  private database (): void {
    DataBase.conectarMongoDB(this.express)
  }

  private routes (): void {
    this.express.use('/', configuration.unless({
      path: [
        '/api',
        '/api/auth/signUp',
        '/api/auth/signIn'
      ]
    }), routes)
    this.express.use(notFound)
    this.express.use(serverError)
  }
}

export default new App().express
