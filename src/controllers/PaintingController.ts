import { Request, Response, NextFunction } from 'express'
import { Painting } from 'models'

export const addPainting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const image = req.file!

  try {
    const painting = await Painting.create({
      ...req.body,
      image: image.path,
    })

    res.status(201).json({
      message: 'New painting added successfully',
      painting,
    })
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
