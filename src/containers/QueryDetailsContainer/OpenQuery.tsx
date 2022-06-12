import { QueryStatus, QueryWithUserAndAssignee } from '../../lib/models'
import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {
  disconnect,
  socketInitializer,
  socketIo,
} from '../../lib/websocket/client'
import { useAuth } from '../../components/Auth/AuthProvider'

interface OpenQueryProps {
  query: QueryWithUserAndAssignee
}

export const OpenQuery: React.FC<OpenQueryProps> = ({ query }) => {
  const auth = useAuth()

  useEffect(() => {
    socketInitializer(auth.user).then(() => {
      socketIo.emit('query-posted', query.id)

      if (query.status === QueryStatus.OPEN) {
        socketIo.emit('assign_query', query.id)
      }
    })
    return () => {
      disconnect()
    }
  }, [query.id, auth.user])

  /**
   * Here we need to keep looking for the query state if query is assigned to someone , it will be in pending state
   */
  return <Box>Query is still pending</Box>
}
