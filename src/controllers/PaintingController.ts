import { Request, Response, NextFunction } from 'express'
import { addNewImage, checkIdIsValid } from 'helpers'
import { Painting } from 'models'

export const addPainting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const image = req.file!
  if (!image) {
    res.status(400).send('No file uploaded.')
    return
  }

  const imagePaths = addNewImage(image)

  try {
    await Painting.create({
      image: imagePaths,
      ...req.body,
    })
    res.status(201).send('painting added')
  } catch (e) {
    next(e)
  }
}

export const getPaintings = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paintings = await Painting.find()
    !paintings && res.status(422).json({ message: 'Paintings not found' })

    res.send(paintings)
  } catch (e) {
    next(e)
  }
}

export const updatePainting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { paintingId } = req.params
  const image = req.file

  checkIdIsValid(paintingId, res)

  const imagePaths = image && addNewImage(image)
  try {
    const painting = await Painting.findByIdAndUpdate(paintingId, {
      ...req.body,
      ...(imagePaths && { image: imagePaths }),
    })
    !painting && res.status(422).json({ message: 'Painting not found' })

    res.status(201).send('painting updated')
  } catch (e) {
    next(e)
  }
}

export const deletePainting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { paintingId } = req.params

  checkIdIsValid(paintingId, res)
  try {
    const painting = await Painting.findByIdAndDelete(paintingId)

    !painting && res.status(422).json({ message: 'Painting not found' })
    res.status(200).send('painting deleted')
  } catch (e) {
    next(e)
  }
}
