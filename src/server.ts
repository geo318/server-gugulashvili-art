import express from 'express'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
import SharpResize from 'utils/resize'
import { Painting } from 'models'
require('config').connect()
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.static('public/uploads'))

const storage = multer.diskStorage({
  destination: './public/originals/',
  filename: (_, file, cb) => {
    cb(
      null,
      file.originalname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})
const upload = multer({ storage })

app.post('/upload', upload.single('img'), async (req, res) => {
  const image = req.file
  if (!image) {
    res.status(400).send('No file uploaded.')
    return
  }

  const imageToResize = new SharpResize(image, 'public/uploads', 'webp')
  imageToResize.save('paintings', 800)
  imageToResize.save('thumbnails', 20)
  const { paintings, thumbnails } = imageToResize.fullFilePath()

  try {
    const painting = await Painting.create({
      image: { fullSize: paintings, thumbnail: thumbnails },
      ...req.body,
    })
    return res.send(painting)
  } catch (e) {
    return res.send(e)
  }
})

const { SERVER_PORT: port } = process.env
app.listen(port, () => console.log(`Server started on port ${port}`))
