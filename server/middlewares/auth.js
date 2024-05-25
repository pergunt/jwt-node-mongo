import ApiError from '../exceptions/api-error'
import {tokenService, userService} from '../service'

export default async (req, res, next) => {
    try {
        const {accessToken} = req.cookies

        if (!accessToken) {
            // got ot catch block
            throw new Error()
        }

        const valid = tokenService.validateAccessToken(accessToken)
        const token = await tokenService.findBy({accessToken})

        if (!valid || !token) {
            // got ot catch block
            throw new Error()
        }

        const user = await userService.findById(token.userId)

        req.user = user

        next()
    } catch {
        next(
            ApiError.UnathError()
        )
    }
}
