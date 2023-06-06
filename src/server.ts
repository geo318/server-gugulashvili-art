import express from 'express'
import cors from 'cors'
import { authRouter, paintingRouter } from 'routes'
import bodyParser from 'body-parser'
import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
require('config').connectMongo()

const server = express()

server.use(cors({
    origin: [process.env.FRONTEND_URI!],
    credentials: true
}))
server.use(bodyParser.json())
server.use(express.static('public/uploads'))

server.use(paintingRouter)
server.use(authRouter)


const { SERVER_PORT: port } = process.env
server.listen(port || 8080, () => console.log(`Server started on port ${port}`))
