import { Db, MongoClient } from 'mongodb'
import { Communication, Mentor, Query, Ticket, User } from '../../lib/models'

let client: MongoClient
let db: Db
const { MONGODB_URL, DB_NAME } = process.env

export const getDB = async () => {
  if (client && db) return { db, client }

  console.log('Connecting to DB')
  const mongoClient = new MongoClient(MONGODB_URL as string, {})
  await mongoClient.connect()

  console.log('Connected')

  client = mongoClient
  db = client.db(DB_NAME as string)
  return {
    client,
    db,
  }
}

export type Collections =
  | 'user'
  | 'query'
  | 'communication'
  | 'mentor'
  | 'ticket'
  | 'base'

export const getCollection = async <T = any>(collectionName: Collections) => {
  const { db } = await getDB()
  return db.collection<
    T & {
      created_at: string
    }
  >(collectionName)
}

export const getUserCollection = getCollection<User>('user')
export const getCommunicationCollection =
  getCollection<Communication>('communication')
export const getTicketCollection = getCollection<Ticket>('ticket')
export const getMentorCollection = getCollection<Mentor>('mentor')
export const getQueryCollection = getCollection<Query>('query')
