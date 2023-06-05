import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) return res.status(403).json({ message: 'Forbidden' })

  const token = authHeader!.split(' ')[1]

  const isTokenExpired = (token: string) =>
    Date.now() >=
    JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000

  if (isTokenExpired(token))
    return res.status(401).json({ message: 'Token Expired' })

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SEC_AUTH!)
    if (!decodedToken)
      return res.status(401).json({ message: 'Not authenticated' })
  } catch (err: any) {
    err.statusCode = 500
    throw err
  }

  next()
}

export default authMiddleware
