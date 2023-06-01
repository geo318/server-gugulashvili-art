import express from 'express'
import { addPainting } from 'controllers'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: './public/originals/',
  filename: (_, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.trim().replace(/\s/g, '-')}`),
})
const upload = multer({ storage: storage })

const router = express.Router()

router.post('/upload', upload.single('img'), addPainting)

export default router
