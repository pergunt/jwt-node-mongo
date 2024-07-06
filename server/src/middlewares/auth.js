import ApiError from '../exceptions/api-error'
import {tokenService} from '../service'

export default async (req, res, next) => {
    try {
        const {accessToken, refreshToken} = req.cookies

        if (!accessToken) {
            next(ApiError.UnathError())
            return
        }

        const user = tokenService.validateAccessToken(accessToken)
        const token = await tokenService.findByRefreshToken(refreshToken)

        if (!token) {
            next(ApiError.UnathError())
            return
        }

        req.user = user

        next()
    } catch {
        next(ApiError.UnathError())
    }
}
