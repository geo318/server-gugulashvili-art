import mongoose from 'mongoose'
import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

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

  const mongooseURL = isConnectedToLocalDatabase
  ? useLocalMongoDbUrl()
  : useAtlasMongoDbUrl()
  
const connect = async () => {
  try {
    await mongoose.connect(mongooseURL)
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export default connect
