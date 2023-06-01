import { Response } from 'express'

export const checkIdIsValid = (id: string, res: Response) =>
  !id.match(/^[0-9a-fA-F]{24}$/) &&
  res.status(422).json({ message: 'Please provide a valid id' })
