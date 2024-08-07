import {Router} from 'express'
import {authMiddleware} from 'middlewares'
import {userController} from 'controllers'
import {body} from 'express-validator'

const router = Router()

router.post(
    '/register',
    body('email').isEmail(),
    body('password').isLength({min: 2, max: 32}),
    userController.register
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get(
    '/users/:id',
    authMiddleware,
    userController.getById
)
router.get(
    '/users',
    authMiddleware,
    userController.getUsers
)

export default router
