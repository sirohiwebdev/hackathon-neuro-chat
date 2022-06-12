import express from 'express'
import { TicketModel } from '../../models/TicketModel'
import {
  AuthenticatedRequest,
  validateRole,
  validateUser,
} from '../../middlewares/validateUser'
import { TicketStatus, UserRole } from '../../../lib/models'

const router = express.Router()

const ticketModel = new TicketModel()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await ticketModel.get(id)

  if (!user) return res.status(404).end()

  return res.json(user)
})

router.put(
  '/:id',
  // @ts-ignore
  validateUser,
  validateRole(UserRole.MENTOR),
  async (req: AuthenticatedRequest, res) => {
    const { body } = req
    const { id } = req.params
    const updateResult = await ticketModel.update(id, body)
    return res.json(updateResult)
  }
)

router.post(
  '/',
  // @ts-ignore
  validateUser,
  validateRole(UserRole.MENTOR),
  async (req: AuthenticatedRequest, res) => {
    const { body, user } = req
    const inserted = await ticketModel.insert({
      ...body,
      assignee: user.id,
      status: TicketStatus.PROGRESS,
    })
    return res.json(inserted)
  }
)

router.get('/', async (req, res) => {
  const { limit, page, ...query } = req.query
  const tickets = await ticketModel.find(
    query,
    Number(limit) || undefined,
    Number(page) || undefined
  )

  return res.json(tickets)
})

export default router
