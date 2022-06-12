import { User } from '../../lib/models'
import jwt from 'jsonwebtoken'

const { SECRET } = process.env
export const verify = (token: string) => {
  const payload = jwt.verify(token, SECRET as string)
  return payload as Omit<User, 'password'>
}

export const sign = (payload: Omit<User, 'password'>) => {
  return jwt.sign(JSON.stringify(payload), SECRET as string)
}
