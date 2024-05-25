import {Schema, model} from 'mongoose'
import TokenModel from './token'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String,
    }
})

UserSchema.post('remove', async document => {
    const userId = document._id

    await TokenModel.deleteOne({userId})
})


export default model('User', UserSchema)
