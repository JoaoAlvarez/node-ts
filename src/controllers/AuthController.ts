import { Request, Response, NextFunction } from 'express'
import UserSchema, { IUser } from '@models/User'
import Logger from '../middlewares/logger'
import { InvalidCredentials } from '@exceptions/exception'

const LOG = new Logger('AuthController')
class AuthController {
  public async signUp (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { body } = req
      const userObj : IUser = new UserSchema(body)
      await userObj.save()
      return res.json({ message: userObj })
    } catch (error) {
      LOG.logError(error)
      next(error)
    }
  }

  public async signIn (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const {
        body: { email, password }
      } = req
      let user = await UserSchema.findOne({ email })

      if (!user) {
        throw new InvalidCredentials()
      }

      console.log('user:', user)
      const isValidPassword = await user.comparePassword(password)

      if (!isValidPassword) {
        throw new InvalidCredentials()
      }

      user = await user.generateToken()

      return res.json(user)
    } catch (error) {
      LOG.logError(error)
      next(error)
    }
  }

  public async perfil (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const users = await UserSchema.find()

      return res.json(users)
    } catch (error) {
      LOG.logError(error)
      next(error)
    }
  }
}

export default new AuthController()
