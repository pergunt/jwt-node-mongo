import ApiError from '../exceptions/api-error'
import {tokenService} from '../service'

export default async (req, res, next) => {
    try {
        const {accessToken, refreshToken} = req.cookies

        if (!accessToken) {
            // got to the catch block
            throw new Error()
        }

        const user = tokenService.validateAccessToken(accessToken)
        const token = await tokenService.findByRefreshToken(refreshToken)

        if (!user || !token) {
            // got ot catch block
            throw new Error()
        }

        req.user = user

        next()
    } catch {
        next(
            ApiError.UnathError()
        )
    }
}
