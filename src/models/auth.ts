import mongoose from 'mongoose'

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
})

export const User = mongoose.model('auth', loginSchema)
