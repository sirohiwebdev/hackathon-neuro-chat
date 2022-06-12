import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Mentor, Query } from '../../lib/models'
import { useEffect, useMemo } from 'react'
import { QueryListItem, QueryWithAssignee } from './QueryListItem'
import { NewQueryModal } from './NewQueryModal'
import { useMutation } from 'react-query'
import { listQueriesByMe } from '../../lib/api'

interface QueryContainerProps {
  queries: Query[]
  mentors: Mentor[]
}

export const QueryContainer = ({ queries, mentors }: QueryContainerProps) => {
  const newQueryModel = useDisclosure()
  const listMyQuery = useMutation('list-query', listQueriesByMe)

  useEffect(() => {
    listMyQuery.mutate({ withAssignee: true })
  }, [])

  return (
    <Box w="full" py={3}>
      <NewQueryModal
        isOpen={newQueryModel.isOpen}
        onClose={newQueryModel.onClose}
      />
      <Box py={3} w={{ base: 'full', md: '70%', lg: '60%' }} mx={'auto'}>
        <Flex justifyContent={'space-between'} alignItems="center" py={3}>
          <Text fontWeight={'bold'}>My Queries</Text>
          <Button onClick={newQueryModel.onOpen} colorScheme="blue">
            New Query
          </Button>
        </Flex>

        <Box borderTopWidth={1} py={1}>
          {listMyQuery.isLoading && <Spinner />}
          {!listMyQuery.isLoading &&
            (listMyQuery.data || []).map((qm) => (
              <QueryListItem key={qm.id} query={qm} />
            ))}
        </Box>
      </Box>
    </Box>
  )
}
