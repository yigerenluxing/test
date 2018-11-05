

import { Schema, model } from 'mongoose'

const UserModel = new Schema({
    userId: String,
    userName: String,
    passworld: String
})

export default model('user', UserModel)

