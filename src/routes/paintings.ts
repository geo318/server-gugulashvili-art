import express from 'express'
import { addPainting } from 'controllers'
import multer from 'multer'

const storageConfig = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'images')
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})
const upload = multer({ storage: storageConfig })


const router = express.Router()

router.post('/add-quote', upload.single('image'), addPainting)
