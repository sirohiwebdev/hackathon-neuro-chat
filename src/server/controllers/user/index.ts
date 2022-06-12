import express from 'express'
import { UserModel } from '../../models/UserModel'

const router = express.Router()

const userModel = new UserModel()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await userModel.get(id)

  if (!user) return res.status(404).end()

  return res.json(user)
})

router.post('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  const exists = await userModel.get(id)

  if (!exists) return res.status(404).end()
  await userModel.update(id, body)

  return res.status(200)
})

router.post('/', async (req, res) => {
  console.log('Creating user')
  const { body } = req
  const user = await userModel.insert(body)

  return res.json(user)
})

router.get('/', async (req, res) => {
  const { limit, page, ...query } = req.query
  const user = await userModel.find(
    query,
    Number(limit) || undefined,
    Number(page) || undefined
  )

  return res.json(user)
})

export default router
