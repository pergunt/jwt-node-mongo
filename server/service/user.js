import {userModel} from "../models"
import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import {mailService, tokenService} from '../service'
import {UserDTO} from '../dtos'
import ApiError from '../exceptions/api-error'

const saveTokens = async (user) => {
    const userDTO = new UserDTO(user)
    const tokens = tokenService.generateTokens({...userDTO})

    await tokenService.saveTokens(userDTO.id, tokens)

    return {
        ...tokens,
        user: userDTO
    }
}

export const activate = async (activationLink) => {
    const user = await userModel.findOne({activationLink})

    if (!user) {
        throw ApiError.BadRequest('user not found')
    }

    user.activated = true

    await user.save()
}

export const register = async (email, password) => {
    const candidate = await userModel.findOne({email})

    if (candidate) {
        throw ApiError.BadRequest('A user already exists')
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = v4()

    const user = await userModel.create({
        email,
        password: hashPassword,
        activationLink
    })

    await mailService.sendActivation(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    return saveTokens(user)
}

export const login = async (email, password) => {
    const user = await userModel.findOne({email})

    if (!user) {
        throw ApiError.BadRequest('User not found')
    }

    const passwordsEqual = await bcrypt.compare(password, user.password)

    if (!passwordsEqual) {
        throw ApiError.BadRequest("Password doesn't match")
    }

    return saveTokens(user)
}

export const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw ApiError.UnathError()
    }

    const valid = tokenService.validateRefreshToken(refreshToken)
    const token = await tokenService.findByRefreshToken(refreshToken)

    if (!valid || !token) {
        throw ApiError.UnathError()
    }

    const user = await userModel.findById(token.userId)

    return saveTokens(user)
}

export const findById = async (id) => {
    const result = await userModel.findById(id)

    return new UserDTO(result)
}

export const getAll = () => userModel.find()

export const logout = (refreshToken) => tokenService.remove(refreshToken)
