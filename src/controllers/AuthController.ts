import { Request, Response } from 'express'
import User from '../models/User'
import Logger from '../middlewares/logger'

const LOG = new Logger('AuthController')
class AuthController {
  public async signUp (req: Request, res: Response): Promise<Response> {
    LOG.logInfo('inicio do metodo signUp')
    return res.json({ message: 'teste' })
  }

  public async signIn (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.json(users)
  }

  public async perfil (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.json(users)
  }
}

export default new AuthController()
