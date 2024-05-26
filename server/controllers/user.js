import userService from '../service/user'
import {validationResult} from 'express-validator'
import ApiError from '../exceptions/api-error'

class User {
    setCookies(res, {refreshToken, accessToken}) {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        })
    }

    async wrapper(fn, next) {
        try {
            return await fn()
        } catch (e) {
            next(e)
        }
    }

    register = (req, res, next) => {
        return this.wrapper(async () => {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                const err = ApiError.BadRequest('Validation Error', errors.array())

                return next(err)
            }

            const {email, password} = req.body
            const {user, ...tokens} = await userService.register(email, password)

            this.setCookies(res, tokens)

            return res.json(user)
        }, next)
    }

    login = (req, res, next) => {
        return this.wrapper(async () => {
            const { email, password } = req.body
            const {user, ...tokens} = await userService.login(email, password)

            this.setCookies(res, tokens)

            return res.json(user)
        }, next)
    }

    logout = (req, res, next) => {
        return this.wrapper(async () => {
            const {refreshToken} = req.cookies

            const token = await userService.logout(refreshToken)

            res.clearCookie('refreshToken')
            res.clearCookie('accessToken')

            return res.json(token)
        }, next)
    }
    activate(req, res, next) {
        return this.wrapper(async () => {
            const activationLink = req.params.link

            await userService.activate(activationLink)

            return res.redirect(process.env.FRONT_END_URL)
        }, next)
    }
    refresh = (req, res, next) => {
        return this.wrapper(async () => {
            const {refreshToken} = req.cookies

            const {user, ...tokens} = await userService.refresh(refreshToken)

            this.setCookies(res, tokens)

            return res.json(user)
        }, next)
    }

    getById = (req, res, next) => {
        return this.wrapper(async() => {
            const user = await userService.findById(req.params.id)

            return res.json(user)
        }, next)
    }
    getUsers = (req, res, next) => {
        return this.wrapper(async() => {
            const users = await userService.getAll()

            return res.json(users)
        }, next)
    }
}

export default new User()
