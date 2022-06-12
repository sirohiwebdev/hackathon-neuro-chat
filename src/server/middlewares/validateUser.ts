import { NextFunction, Request, Response } from 'express'
import { User, UserRole } from '../../lib/models'
import { verify } from '../services/jwt'

export interface AuthenticatedRequest extends Request {
  user: Omit<User, 'password'>
}

export const validateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers)
  if (!req.headers.authorization) {
    return res.status(400).json({ message: 'No auth headers present' })
  }
  const [c, token] = (req.headers.authorization as string).split(' ')

  try {
    // @ts-ignore
    req.user = await verify(token)
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export const validateRole =
  (role: UserRole) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { user } = req
    if (!user || user.role !== role) {
      return res.status(403)
    }

    next()
  }
