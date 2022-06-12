import { Box } from '@chakra-ui/react'
import { PageWrapper } from '../../components/PageWrapper'
import { QueryContainer } from '../QueryContainer'

export const StudentDashboard = () => {
  return (
    <PageWrapper pageTitle={'Dashboard'}>
      <Box>
        <Box w={{ base: 'full', md: '70%' }} mx={'auto'}>
          <QueryContainer queries={[]} mentors={[]}/>
        </Box>
      </Box>
    </PageWrapper>
  )
}
