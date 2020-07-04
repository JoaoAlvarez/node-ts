import { Router } from 'express'

import UserController from '../controllers/UserController'

const usersRouter = Router()

usersRouter.get('/', UserController.index)

export default usersRouter
