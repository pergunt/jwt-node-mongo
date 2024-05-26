import {userModel} from "../models"
import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import {mailService, tokenService} from '../service'
import {UserDTO} from '../dtos'
import ApiError from '../exceptions/api-error'

class UsersService {
    async saveTokens(user) {
        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDTO})

        await tokenService.saveTokens(userDTO.id, tokens)

        return {
            ...tokens,
            user: userDTO
        }
    }

    async activate(activationLink) {
        const user = await userModel.findOne({activationLink})

        if (!user) {
            throw ApiError.BadRequest('user not found')
        }

        user.activated = true
        await user.save()
    }

    async register(email, password) {
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

        return this.saveTokens(user)
    }

    async login(email, password) {
        const user = await userModel.findOne({email})

        if (!user) {
            throw ApiError.BadRequest('User not found')
        }

        const passwordsEqual = await bcrypt.compare(password, user.password)

        if (!passwordsEqual) {
            throw ApiError.BadRequest("Password doesn't match")
        }

        return this.saveTokens(user)
    }

    async logout(refreshToken) {
        return tokenService.remove(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnathError()
        }

        const valid = tokenService.validateRefreshToken(refreshToken)
        const token = await tokenService.findByRefreshToken(refreshToken)

        if (!valid || !token) {
            throw ApiError.UnathError()
        }

        const user = await userModel.findById(token.userId)

        return this.saveTokens(user)
    }

    async findById(id) {
        const result = await userModel.findById(id)

        return new UserDTO(result)
    }
    getAll() {
        return userModel.find()
    }
}

export default new UsersService()
