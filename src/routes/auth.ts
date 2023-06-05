import express from 'express'
import { login, checkAuth } from 'controllers'
import { isAuth } from 'middleware'

const router = express.Router()

router.post('/login', login)
router.get('/check', isAuth, checkAuth)

export default router
