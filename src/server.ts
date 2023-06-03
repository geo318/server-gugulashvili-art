import express from 'express'
import cors from 'cors'
import { paintingRouter } from 'routes'
require('config').connectMongo()
require('dotenv').config()

const server = express()
server.use(cors())
server.use(express.static('public/uploads'))

server.use(paintingRouter)

const { SERVER_PORT: port } = process.env
server.listen(port, () => console.log(`Server started on port ${port}`))
