import { Collections, getCollection } from '../database/connection'
import { uuidV4 } from 'mongodb/src/utils'
import { BaseModel } from './BaseModel'
import { Ticket, User } from '../../lib/models'

export class TicketModel extends BaseModel<Ticket> {
  collectionName: Collections

  constructor() {
    super()
    this.collectionName = 'ticket'
  }
}
