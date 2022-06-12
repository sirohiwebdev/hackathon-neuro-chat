import express from 'express'
import { body } from 'express-validator'
import { UserModel } from '../../models/UserModel'
import { validateReq } from '../../middlewares/validateReq'
import {sign} from "../../services/jwt";
export const authRouter = express.Router()
const userModel = new UserModel()

authRouter.post(
  '/login',
  body(['username', 'password']).exists(),
  validateReq,
  async (req, res, next) => {
    const { body } = req

    const loggedUser = await userModel.login(body.username, body.password)
    if (!loggedUser.success) {
      return res.status(loggedUser.notFound ? 404 : 401).json({
        message: loggedUser.notFound ? 'User not found' : 'Invalid password',
      })
    }

    const token = sign(loggedUser.user as any)
    return res.json({token})
  }
)

authRouter.post(
  '/signin',
  body(['username', 'password', 'role', 'name']).exists(),
  validateReq,
  async (req, res, next) => {
    const { body } = req
    const register = await userModel.signUp(body)

    if ('alreadyExists' in register && register.alreadyExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    return res.json(register)
  }
)
