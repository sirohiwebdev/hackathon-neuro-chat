import { Collections } from '../database/connection'
import { BaseModel } from './BaseModel'
import { Communication } from '../../lib/models'

export class CommunicationModel extends BaseModel<Communication> {
  collectionName: Collections

  constructor() {
    super()
    this.collectionName = 'communication'
  }
}
