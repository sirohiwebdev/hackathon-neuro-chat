import { Collections, getCollection } from '../database/connection'
import { v4 } from 'uuid'

export class BaseModel<T extends any> {
  protected collectionName: Collections

  constructor() {
    this.collectionName = 'base'
  }

  protected get collection() {
    return getCollection(this.collectionName)
  }

  insert = async (body: Omit<T, 'id'>) => {
    const dbCollection = await this.collection
    const id = v4()
    const data = await dbCollection.insertOne({
      id,
      ...body,
      created_at: Date.now().toString(),
    })

    return { id }
  }

  get = async (id: string): Promise<any> => {
    const dbCollection = await this.collection
    // @ts-ignore
    return dbCollection.findOne<T>({ id }) as any
  }

  update = async (id: string, body: Partial<T>) => {
    const dbCollection = await this.collection
    return dbCollection.updateOne({ id }, { $set: body })
  }

  remove = async (id: string) => {
    const dbCollection = await this.collection

    return dbCollection.deleteOne({ id })
  }

  find = async (options: Partial<T>, limit = 100, offset = 0) => {
    if (offset < 0) {
      offset = 0
    }

    const dbCollection = await this.collection
    const found = await dbCollection.find(options, {
      limit,
      skip: limit * offset,
      sort: {
        timestamp: -1,
      },
    })

    return found.toArray()
  }
}
