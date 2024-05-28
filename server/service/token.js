import jwt from 'jsonwebtoken'
import {tokenModel} from '../models'

const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION,
    JWT_EXPIRATION
} = process.env

export const generateTokens = (payload) => {
    return {
        accessToken: jwt.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn: 30 * 24 * 60 * 60
            // expiresIn: '10s'
        }),
        refreshToken: jwt.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: 30 * 24 * 60 * 60
            // expiresIn: '10s'
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

export const validateAccessToken = async (accessToken) => {
    try {
        return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    } catch (e) {
        return null
    }
}

export const validateRefreshToken = async (refreshToken) => {
    try {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch (e) {
        return null
    }
}

export const findByRefreshToken = (refreshToken) => tokenModel.findOne({refreshToken})
