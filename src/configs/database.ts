import mongoose from 'mongoose'
import Logger from '../middlewares/logger'

const LOG = new Logger('DataBase')
class DataBase {
  public async conectarMongoDB (app): Promise<void> {
    console.log('express.conn', app.conn)
    // app.conn = new Promise((resolve, reject) => {
    if (app.conn && app.conn.db && app.conn.db.serverConfig &&
        app.conn.db.serverConfig.isConnected()) {
      return
    }

    mongoose.set('bufferCommands', false)

    mongoose.connection.on('error', errorConnectingToDatabase => {
      LOG.logError(errorConnectingToDatabase)
    })

    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,

      autoIndex: false,
      poolSize: 2,
      bufferMaxEntries: 0,
      bufferCommands: false,
      useUnifiedTopology: true
    })
      .then(() => {
        LOG.logInfo('Conectado a base de dados')
        // resolve(mongoose.connection)
      })
      .catch(err => LOG.logError(err))
    // })
    LOG.logInfo('Conectado ao banco de dados')
  }
}

export default new DataBase()
