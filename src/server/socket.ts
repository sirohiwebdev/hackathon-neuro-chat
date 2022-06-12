import { Socket, Server } from 'socket.io'
import { httpServer } from './httpserver'
import { CommunicationModel } from './models/CommunicationModel'
import { Communication } from '../lib/models'
export const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'],
  },
})
const mentors: Set<string> = new Set<string>()
const students: Set<string> = new Set<string>()

interface IntroData {
  iAm: 'student' | 'mentor'
  id: string
}

export const connectionHandler = (socket: Socket) => {
  console.log('a user connected', socket.data)

  socket.on('intro', (data: IntroData) => {
    console.log(data, socket.id)
    data?.iAm && socket.join(data.iAm)
  })

  socket.on('chat', (query: string) => {
    socket.join(query)
  })

  socket.on('chat-message', (message: Communication) => {
    const communicationModel = new CommunicationModel()
    communicationModel.insert(message).then(console.log)

    socket.to(message.queryId).emit('message', message)
  })

  // socket.on('assign_query', (queryId: string) => {
  //   socket.to('mentor').emit('query_assign_req', queryId)
  // })

  socket.on('query-posted', (query: string) => {
    // socket.to(mentors)
  })

  socket.on('add-mentor', (mentorId: string) => {
    console.log(mentorId)
    mentors.add(mentorId)
  })
  socket.on('leave-mentor', (mentorId: string) => mentors.delete(mentorId))
  socket.on('add-student', (studentId: string) => students.add(studentId))
  socket.on('leave-student', (studentId: string) => students.delete(studentId))

  socket.on('message', async (message) => {
    console.log('message', message)
    // allSockets
  })
  //
}
