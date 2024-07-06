import jwt from 'jsonwebtoken'
import {tokenModel} from '../models'

const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_EXPIRATION,
} = process.env

export const generateTokens = (payload) => {
    return {
        accessToken: jwt.sign(payload, JWT_ACCESS_SECRET, {
            // expiresIn: 30 * 24 * 60 * 60
            expiresIn: JWT_ACCESS_EXPIRATION
        }),
        refreshToken: jwt.sign(payload, JWT_REFRESH_SECRET, {
            // expiresIn: 30 * 24 * 60 * 60
            expiresIn: JWT_REFRESH_EXPIRATION
        })
    }
}

export const saveTokens = async (userId, {accessToken, refreshToken}) => {
    const tokenData = await tokenModel.findOne({userId})

    if (tokenData) {
        tokenData.accessToken = accessToken
        tokenData.refreshToken = refreshToken

        return tokenData.save()
    }

    await tokenModel.create({
        userId,
        accessToken,
        refreshToken,
    })
}

export const remove = async (refreshToken) => {
    const token = await tokenModel.deleteOne({refreshToken})

    return token
}

export const validateAccessToken = (accessToken) => jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)

export const validateRefreshToken = (refreshToken) => jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

export const findByRefreshToken = (refreshToken) => tokenModel.findOne({refreshToken})
