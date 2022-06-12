import { Collections, getCollection } from '../database/connection'
import { uuidV4 } from 'mongodb/src/utils'
import { BaseModel } from './BaseModel'
import { Mentor, User } from '../../lib/models'

export class MentorModel extends BaseModel<Mentor> {
  collectionName: Collections

  constructor() {
    super()
    this.collectionName = 'mentor'
  }
}
