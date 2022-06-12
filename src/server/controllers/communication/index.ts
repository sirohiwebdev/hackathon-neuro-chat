import express from 'express'
import { CommunicationModel } from '../../models/CommunicationModel'
import { validateUser } from '../../middlewares/validateUser'

const router = express.Router()

const communicationModel = new CommunicationModel()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await communicationModel.get(id)

  if (!user) return res.status(404).end()

  return res.json(user)
})

router.post('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  const exists = await communicationModel.get(id)

  if (!exists) return res.status(404).end()
  await communicationModel.update(id, body)

  return res.status(200)
})

// @ts-ignore
router.get('/', validateUser, async (req, res) => {
  const { limit, page, ...query } = req.query
  const communications = await communicationModel.find(
    query,
    Number(limit) || undefined,
    Number(page) || undefined
  )

  return res.json(communications)
})

export default router
