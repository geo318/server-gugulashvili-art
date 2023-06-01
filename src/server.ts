import express from 'express'
import cors from 'cors'
import { paintingRouter } from 'routes'
require('config').connectMongo()
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.static('public/uploads'))

app.use(paintingRouter)

const { SERVER_PORT: port } = process.env
app.listen(port, () => console.log(`Server started on port ${port}`))
