import { Router } from 'express'

import UserController from '../controllers/UserController'

const usersRouter = Router()

usersRouter.put('/update', UserController.update)

export default usersRouter
