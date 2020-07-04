import { Router } from 'express'
import authRoutes from './routes/auth'
import usersRoute from './routes/user-routes'

const router = Router()

router.get('/api', (req, res) => res.json(new Date()))
router.use('/api/auth', authRoutes)
router.use('/api/user', usersRoute)

export default router
