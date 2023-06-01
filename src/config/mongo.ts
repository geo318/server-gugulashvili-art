import mongoose from 'mongoose'

const isConnectedToLocalDatabase = process.env.MONGO_PROTOCOL === 'localhost'

const useLocalMongoDbUrl = () => {
  const { MONGO_PROTOCOL, MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env
  return `${MONGO_PROTOCOL}://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`
}

const useAtlasMongoDbUrl = () => {
  const {
    MONGO_PROTOCOL,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_DATABASE,
  } = process.env

  return `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`
}

const connect = async () => {
  try {
    const mongooseURL = isConnectedToLocalDatabase ? useLocalMongoDbUrl() : useAtlasMongoDbUrl()

    return mongoose.connect(
      'mongodb+srv://george:L1o9m9a3@claster0.z0yuylp.mongodb.net/paintings?retryWrites=true&w=majority'
    )
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export default connect
