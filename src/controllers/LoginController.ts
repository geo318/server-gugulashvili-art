import { Request, Response, NextFunction } from 'express'
import { User } from 'models'
import jwt from 'jsonwebtoken'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body

  if (!username || !password)
    return res.status(422).json({ message: 'Credentials not provided' })

  try {
    const existingUser = await User.findOne({ username })

    if (!existingUser || password !== existingUser.password)
      return res.status(422).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { userId: existingUser!._id },
      process.env.JWT_SEC_AUTH!,
      { expiresIn: '14d' }
    )
    res.status(200).json({ token, id: existingUser!._id }).send('OK')
  } catch (err) {
    next(err)
  }
}

export const checkAuth = (_: Request, res: Response) => {
  res.status(200).send('OK')
}
