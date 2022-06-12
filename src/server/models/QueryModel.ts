import { Collections, getCollection } from '../database/connection'
import { uuidV4 } from 'mongodb/src/utils'
import { BaseModel } from './BaseModel'
import { Query, User } from '../../lib/models'

export class QueryModel extends BaseModel<Query> {
  collectionName: Collections

  constructor() {
    super()
    this.collectionName = 'query'
  }
}
