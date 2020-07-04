import { Request, Response } from 'express'
import UserSchema from '../models/User'
class UserController {
  public async update (req: Request, res: Response): Promise<Response> {
    const user = await UserSchema.findById(req.user.id)
    user.userName = req.body.userName
    user.email = req.body.email
    user.fistName = req.body.fistName
    user.lastName = req.body.lastName
    if (req.body.password) {
      user.password = req.body.password
    }
    await user.save()
    return res.json(user)
  }
}

export default new UserController()
