import { QueryWithUserAndAssignee } from '../../lib/models'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { QueryCommunication } from '../../components/Communication'
import { useAuth } from '../../components/Auth/AuthProvider'

interface PendingQueryProps {
  query: QueryWithUserAndAssignee
}

export const PendingQuery: React.FC<PendingQueryProps> = ({ query }) => {

  const auth = useAuth();

  return (
    <Box mt={3}>
      <QueryCommunication
        query={query}
        currentUser={auth.user.id}
      />
    </Box>
  )
}
