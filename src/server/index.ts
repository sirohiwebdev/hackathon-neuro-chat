import { connectionHandler, io } from './socket'
import { httpServer } from './httpserver'

io.on('connection', connectionHandler)

const port = process.env.PORT || 8080
httpServer.listen(port, () => {
  console.log('Listening on Port', port)
})
