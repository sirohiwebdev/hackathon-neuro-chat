import express from 'express'
import { MentorModel } from '../../models/MentorModel'

const router = express.Router()

const mentorModel = new MentorModel()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await mentorModel.get(id)
  if (!user) return res.status(404).end()

  return res.json(user)
})

router.post('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  const exists = await mentorModel.get(id)

  if (!exists) return res.status(404).end()
  await mentorModel.update(id, body)

  return res.status(200)
})

export default router
