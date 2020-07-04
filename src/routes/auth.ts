import { Router } from 'express'

import AuthController from '../controllers/AuthController'
const router: Router = Router()

router.post('/signUp', AuthController.signUp)
router.post('/signIn', AuthController.signIn)
router.get('/profile', AuthController.perfil)

export default router
