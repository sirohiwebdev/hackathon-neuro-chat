import express from 'express'
import userRouter from './user'
import ticketRouter from './ticket'
import queryRouter from './query'
import mentorRouter from './mentor'
import communicationRouter from './communication'
export const apiRouter = express.Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/communications', communicationRouter)
apiRouter.use('/mentors', mentorRouter)
apiRouter.use('/tickets', ticketRouter)
apiRouter.use('/query', queryRouter)
