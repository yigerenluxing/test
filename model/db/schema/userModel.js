

import { Schema, model } from 'mongoose'

const UserModel = new Schema({
    userId: String,
    userName: String,
    password: String
})

export default model('user', UserModel)

