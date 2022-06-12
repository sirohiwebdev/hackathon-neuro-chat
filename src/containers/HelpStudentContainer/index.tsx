import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { QueryCommunication } from '../../components/Communication'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { createTicket, getQueryById, getTickets } from '../../lib/api'
import { useAuth } from '../../components/Auth/AuthProvider'
import { UpdatedTicket } from './UpdatedTicket'

interface HelpStudentContainerProps {
  query: string
}

export const HelpStudentContainer: React.FC<HelpStudentContainerProps> = ({
  query,
}) => {
  const auth = useAuth()

  const getQuery = useMutation('get-query-data', getQueryById)
  const getTicket = useMutation('get-ticket-data', getTickets)
  const createNewTicket = useMutation('create-ticket', createTicket)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleTicketAction = () => {
    if (!getTicket.data || !getTicket.data.length) {
      createNewTicket.mutate(query, {
        onSuccess: () => {
          getTicket.mutate(query)
        },
      })
    } else {
      onOpen()
    }
  }

  useEffect(() => {
    getQuery.mutate(query)
  }, [query])

  useEffect(() => {
    getTicket.mutate(query)
  }, [query])

  if (getQuery.isLoading) {
    return <Skeleton w={'full'} h={'50px'} />
  }

  return (
    <Box w={{ base: 'full', md: '70%' }} mx={'auto'}>
      {auth.user && getQuery.data && !getQuery.isLoading && (
        <>
          <Box>
            {getTicket.data && getTicket.data[0] && (
              <UpdatedTicket
                isOpen={isOpen}
                onClose={onClose}
                ticket={getTicket.data[0]}
                onTicketUpdate={() => getTicket.mutate(query)}
              />
            )}
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Box>
                <Heading fontWeight={'bold'} mb={2}>
                  {getQuery.data.title}
                </Heading>
                <Text>{getQuery.data.description}</Text>
              </Box>
              <Box>
                {getTicket.isLoading ? (
                  <Skeleton w={'60px'} h={'36px'} bg={'yellow.500'} />
                ) : (
                  <Flex alignItems={'center'}>
                    <Text fontSize={'xs'} p={1} bg={'gray.200'}>
                      {getTicket.data &&
                        getTicket.data[0] &&
                        getTicket.data[0].id.slice(0, 8)}
                    </Text>
                    <Button
                      size={'sm'}
                      rounded={0}
                      colorScheme={'yellow'}
                      onClick={handleTicketAction}
                    >
                      {getTicket.data && getTicket.data.length
                        ? 'Update Ticket'
                        : 'Create Ticket'}
                    </Button>
                  </Flex>
                )}
              </Box>
            </Flex>
          </Box>
          <QueryCommunication
            query={getQuery.data}
            currentUser={auth.user.id}
          />
        </>
      )}
    </Box>
  )
}
