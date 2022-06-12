import { useEffect, useState } from 'react'
import {
  disconnect,
  socketInitializer,
  socketIo,
} from '../../lib/websocket/client'
import { useAuth } from '../../components/Auth/AuthProvider'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { listQueries, updateQuery } from '../../lib/api'
import { QueryStatus } from '../../lib/models'
import { useNavigate } from 'react-router'

export const QueryRead = () => {
  const [queries, setQueries] = useState<Set<string>>(new Set())
  const auth = useAuth()
  const navigate = useNavigate()
  const listQuery = useMutation('list-unassigned', listQueries)
  const pickQueryMutation = useMutation('update-query', updateQuery)

  useEffect(() => {
    // @ts-ignore
    listQuery.mutate({
      $or: [
        {
          assignee: auth.user.id,
          status: QueryStatus.PENDING,
        },
        {
          assignee: auth.user.id,
          status: QueryStatus.OPEN,
        },
        {
          assignee: auth.user.id,
          status: QueryStatus.RESOLVED,
        },
        {
          assignee: null,
          status: QueryStatus.OPEN,
        },
      ],
    })
  }, [])

  const pickQueryForHelp = (queryId: string) => {
    pickQueryMutation.mutate(
      {
        id: queryId,
        params: {
          status: QueryStatus.PENDING,
          assignee: auth.user.id,
        },
      },
      {
        onSuccess: () => {
          navigate(`/resolve/${queryId}`)
        },
      }
    )
  }

  useEffect(() => {
    socketInitializer(auth.user).then(() => {
      socketIo.on('query_assign_req', (queryId: string) => {
        setQueries((q) => {
          const d = new Set(q)
          d.add(queryId)
          return d
        })
      })
    })

    return () => {
      disconnect()
    }
  }, [auth.user])

  return (
    <Box>
      {(listQuery.data || []).map((d) => (
        <Box p={2} borderWidth={1} mb={2}>
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text fontWeight={'bold'} mb={2}>
                {d.title}
              </Text>
              <Text>{d.description}</Text>
            </Box>
            {d.status === QueryStatus.OPEN && (
              <Button
                onClick={(e) => pickQueryForHelp(d.id)}
                isDisabled={pickQueryMutation.isLoading}
                colorScheme={'green'}
                size={'sm'}
              >
                Help Student
              </Button>
            )}
            {d.status === QueryStatus.PENDING && (
              <Button
                onClick={() => navigate(`/resolve/${d.id}`)}
                isDisabled={pickQueryMutation.isLoading}
                colorScheme={'blue'}
                size={'sm'}
              >
                Go to Discussion
              </Button>
            )}
          </Flex>
        </Box>
      ))}
    </Box>
  )
}
