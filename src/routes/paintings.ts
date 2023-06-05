import express from 'express'
import {
  addPainting,
  getPaintings,
  updatePainting,
  deletePainting,
} from 'controllers'
import multer from 'multer'
import { isAuth } from 'middleware'

const storage = multer.diskStorage({
  destination: './public/originals/',
  filename: (_, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.trim().replace(/\s/g, '-')}`),
})
const upload = multer({ storage: storage })

const router = express.Router()

router.get('/paintings', getPaintings)
router.post('/upload', isAuth, upload.single('img'), addPainting)
router.patch(
  '/update/:paintingId',
  isAuth,
  upload.single('img'),
  updatePainting
)
router.delete('/delete/:paintingId', isAuth, deletePainting)

export default router
