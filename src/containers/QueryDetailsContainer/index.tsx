import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import {
  Mentor,
  Query,
  QueryStatus,
  QueryWithUserAndAssignee,
  User,
} from '../../lib/models'
import React from 'react'
import { badgeColor } from '../../common'
import { OpenQuery } from './OpenQuery'
import { PendingQuery } from './PendingQuery'

export interface QueryDetailsContainerProps {
  query: QueryWithUserAndAssignee
}
export const QueryDetailsContainer: React.FC<QueryDetailsContainerProps> = ({
  query,
}) => {
  const queryStateMap = {
    [QueryStatus.OPEN]: OpenQuery,
    [QueryStatus.PENDING]: PendingQuery,
    [QueryStatus.RESOLVED]: null,
  }

  const QueryView = queryStateMap[query.status]

  return (
    <Box py={3} w={{ base: 'full', md: '70%' }} mx="auto">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading>{query.title}</Heading>
        <Badge colorScheme={badgeColor[query.status]} textTransform="uppercase">
          {query.status}
        </Badge>
      </Flex>
      <Flex mt={2}>
        <Text>{query.description}</Text>
      </Flex>

      {QueryView && <QueryView query={query} />}
    </Box>
  )
}
