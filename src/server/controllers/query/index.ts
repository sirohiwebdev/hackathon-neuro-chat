import express from 'express'
import { QueryModel } from '../../models/QueryModel'
import { body } from 'express-validator'
import {
  AuthenticatedRequest,
  validateRole,
  validateUser,
} from '../../middlewares/validateUser'
import {
  Query,
  QueryStatus,
  QueryWithUserAndAssignee,
  UserRole,
} from '../../../lib/models'
import { validateReq } from '../../middlewares/validateReq'
import { io } from '../../socket'
import { UserModel } from '../../models/UserModel'

const router = express.Router()

const queryModel = new QueryModel()

// @ts-ignore
router.get('/me', validateUser, async (req: AuthenticatedRequest, res) => {
  const { withAssignee, page, limit, ...query } = req.query
  const { user } = req
  const q = await queryModel.find(
    { ...query, from: user.id },
    Number(limit) || undefined,
    Number(page) || undefined
  )

  console.log(q.length)
  const responseWithAssignee: QueryWithUserAndAssignee[] = []
  if (withAssignee) {
    const userModel = new UserModel()
    for (const eQ of q) {
      if (eQ.assignee) {
        eQ.assignee = (await userModel.get(eQ.assignee)) as any
      }
      eQ.from = user as any
      responseWithAssignee.push(eQ as unknown as QueryWithUserAndAssignee)
    }
  }

  return res.json(responseWithAssignee)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const query = await queryModel.get(id)
  const userModel = new UserModel()

  if (!query) return res.status(404).end()
  const user = await userModel.get(query.from)
  const assignee = await userModel.get(query.assignee)

  if (user) {
    // @ts-ignore
    delete user['password']
  }
  if (assignee) {
    // @ts-ignore
    delete assignee['password']
  }

  return res.json({
    ...query,
    user,
    assignee,
  })
})

router.post('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  const exists = await queryModel.get(id)

  if (!exists) return res.status(404).end()
  await queryModel.update(id, body)

  return res.status(200)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  const data = await queryModel.update(id, body)

  return res.status(200).json(data)
})

router.post('/', async (req, res) => {
  const { withAssignee, page, limit } = req.query
  const { body } = req

  console.log('Query', body)
  const q = await queryModel.find(
    body,
    Number(limit) || undefined,
    Number(page) || undefined
  )

  return res.json(q)
})

router.post(
  '/',
  // @ts-ignore
  validateUser,
  validateRole(UserRole.STUDENT),
  body(['title', 'description']).exists(),
  validateReq,
  async (req: AuthenticatedRequest, res) => {
    const { body, user } = req
    const insert = await queryModel.insert({
      ...body,
      from: user.id,
      status: QueryStatus.OPEN,
    })

    console.log('Created', insert.id)

    // Send broadcast to all mentors connected
    io.sockets.to('mentor').emit('query_assign_req', insert.id)
    return res.json(insert)
  }
)

export default router
