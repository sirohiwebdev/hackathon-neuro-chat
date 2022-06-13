import {
  Mentor,
  Query,
  QueryStatus,
  QueryWithUserAndAssignee,
} from '../../lib/models'
import { Badge, Box, Flex, Link, Text } from '@chakra-ui/react'
import { badgeColor } from '../../common'
import { useNavigate } from 'react-router'

export interface QueryWithAssignee extends Omit<Query, 'assignee'> {
  assignee: Mentor
}

interface QueryListItemProps {
  query: QueryWithUserAndAssignee
}

export const QueryListItem = ({ query }: QueryListItemProps) => {
  const navigate = useNavigate()
  return (
    <Box
      borderWidth={1}
      mb={2}
      _last={{
        mb: 0,
      }}
    >
      <Flex
        p={2}
        justifyContent={'space-between'}
        alignItems={'center'}
        onClick={() => navigate(`/query/${query.id}`)}
        _hover={{
          cursor: 'pointer',
        }}
      >
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {query.title}
        </Text>
        <Badge colorScheme={badgeColor[query.status]} textTransform="uppercase">
          {query.status}
        </Badge>
      </Flex>
      <Box mt={2} p={2}>
        <Text>{query.description}</Text>
      </Box>
      <Flex
        p={2}
        alignItems="center"
        justifyContent={'space-between'}
        borderTopWidth={1}
        mt={3}
      >
        {query.status === QueryStatus.RESOLVED ? (
          <>
            <Text fontWeight="bold">
              Resolved on{' '}
              {new Date(query.resolvedOn as string).toLocaleDateString()}
            </Text>
            <Text>Assigned to {query.assignee?.name}</Text>
          </>
        ) : (
          <>
            <Text>Still to be resolved</Text>
          </>
        )}
      </Flex>
    </Box>
  )
}
