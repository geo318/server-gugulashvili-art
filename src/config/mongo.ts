import mongoose from 'mongoose'
require('dotenv').config()

const {
  MONGO_PROTOCOL,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_OPTIONS,
} = process.env

const isConnectedToLocalDatabase = MONGO_PROTOCOL === 'mongodb'

const useLocalMongoDbUrl = () =>
  `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`

const useAtlasMongoDbUrl = () =>
  `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?${MONGO_OPTIONS}`

const connect = async () => {
  try {
    const mongooseURL = isConnectedToLocalDatabase
      ? useLocalMongoDbUrl()
      : useAtlasMongoDbUrl()

    return await mongoose.connect(mongooseURL)
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export default connect
