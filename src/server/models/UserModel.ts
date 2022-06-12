import { BaseModel } from './BaseModel'
import { User } from '../../lib/models'
import * as bcrypt from 'bcrypt'

const saltRounds = 10
const mySecret = 'dafasfs0tereg4geger63e7wt78tg6re87wg'
export class UserModel extends BaseModel<User> {
  constructor() {
    super()
    this.collectionName = 'user'
  }

  private generateSalt = async () => bcrypt.genSalt(saltRounds)

  private hashPassword = async (passwordPlainText: string) => {
    return await bcrypt.hash(passwordPlainText, await this.generateSalt())
  }

  private comparePassword = (passwordPlain: string, passwordHashed: string) => {
    return bcrypt.compare(passwordPlain, passwordHashed)
  }

  getByUsername = async (username: string) => {
    const userCollection = await this.collection

    return userCollection.findOne<User>({ username })
  }

  login = async (username: string, password: string) => {
    const isPresent = await this.getByUsername(username)

    if (!isPresent)
      return {
        success: false,
        notFound: true,
      }

    const passwordMatched = await this.comparePassword(
      password,
      isPresent.password
    )

    if (!passwordMatched)
      return {
        success: false,
        invalidPassword: true,
      }

    return {
      success: true,
      user: { ...isPresent, password: undefined },
    }
  }

  signUp = async (userData: Omit<User, 'id'>) => {
    const isPresent = await this.getByUsername(userData.username)
    if (isPresent) {
      return {
        alreadyExists: true,
      }
    }

    userData.password = await this.hashPassword(userData.password)

    return await this.insert(userData)
  }
}
