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
    register = async (req, res, next) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                const err = ApiError.BadRequest('Validation Error', errors.array())

                return next(err)
            }

            const {email, password} = req.body
            const user = await userService.register(email, password)

            this.setCookies(res, user)

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await userService.login(email, password)

            this.setCookies(res, user)

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies

            const token = await userService.logout(refreshToken)

            res.clearCookie('refreshToken')
            res.clearCookie('accessToken')

            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link

            await userService.activate(activationLink)

            return res.redirect(process.env.FRONT_END_URL)
        } catch (e) {
            next(e)
        }
    }
    refresh = async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies

            const user = await userService.refresh(refreshToken)

            this.setCookies(res, user)

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAll()

            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new User()
