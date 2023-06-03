import express from 'express'
import {
  addPainting,
  getPaintings,
  updatePainting,
  deletePainting,
} from 'controllers'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: './public/originals/',
  filename: (_, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.trim().replace(/\s/g, '-')}`),
})
const upload = multer({ storage: storage })

const router = express.Router()

router.post('/upload', upload.single('img'), addPainting)
router.get('/paintings', getPaintings)
router.patch('/update/:paintingId', upload.single('img'), updatePainting)
router.delete('/delete/:paintingId', deletePainting)

export default router
