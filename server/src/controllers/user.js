import {userService} from 'service'
import {validationResult} from 'express-validator'
import ApiError from 'exceptions/api-error'

const setCookies = (res, {refreshToken, accessToken}) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    })
}

const wrapper = (fn) => async (req, res, next) => {
    try {
        return await fn(req, res, next)
    } catch (e) {
        next(e)
    }
}

export const register = wrapper(async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const err = ApiError.BadRequest('Validation Error', errors.array())

        return next(err)
    }

    const {email, password} = req.body
    const {user, ...tokens} = await userService.register(email, password)

    setCookies(res, tokens)

    return res.json(user)
})

export const login = wrapper(async (req, res) => {
    const { email, password } = req.body
    const {user, ...tokens} = await userService.login(email, password)

    setCookies(res, tokens)


    return res.json(user)
})

export const logout = wrapper(async (req, res) => {
    const {refreshToken} = req.cookies

    const token = await userService.logout(refreshToken)

    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')

    return res.json(token)
})

export const activate = wrapper(async (req, res) => {
    const activationLink = req.params.link

    await userService.activate(activationLink)

    return res.redirect(process.env.FRONT_END_URL)
})

export const refresh = wrapper(async (req, res) => {
    const {refreshToken} = req.cookies

    const {user, ...tokens} = await userService.refresh(refreshToken)

    setCookies(res, tokens)

    return res.json(user)
})

export const getById = wrapper(async (req, res) => {
    const user = await userService.findById(req.params.id)

    return res.json(user)
})

export const getUsers = wrapper(async (req, res) => {
    const users = await userService.getAll()

    return res.json(users)
})
