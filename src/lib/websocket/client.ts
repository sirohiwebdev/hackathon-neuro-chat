// @ts-ignore
import { io, Socket } from 'socket.io-client'
import { UserWithoutPassword } from '../models'
export let socketIo: Socket

export const socketInitializer = async (user: UserWithoutPassword) => {
  socketIo = io(`ws://${process.env.HOST}`)
  socketIo.on('connect', () => {
    console.log('Connected')
    socketIo.emit('intro', { iAm: user.role, id: user.id })
  })
}

export const disconnect = () => {
  socketIo && socketIo.disconnect()
}
