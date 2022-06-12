import express, { Response, Request, NextFunction } from 'express'
import cors from 'cors'
import { apiRouter } from './controllers'
import { authRouter } from './controllers/auth'
import bodyParser from 'body-parser'
import * as path from 'path'

export const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.use('/api', apiRouter)
app.use('/auth', authRouter)
app.use('/', express.static(path.join(process.cwd(), 'build')))

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack)
  return res.status(500).json({ message: 'Something went wrong' })
})
