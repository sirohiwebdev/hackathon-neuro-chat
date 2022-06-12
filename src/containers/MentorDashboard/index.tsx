import { Box, Text } from '@chakra-ui/react'
import { PageWrapper } from '../../components/PageWrapper'
import { QueryRead } from './QueryRead'

export const MentorDashboard = () => {
  return (
    <PageWrapper pageTitle={'Mentor Dashboard'}>
      <Box mt={3}>
        <Box w={{ base: 'full', md: '70%' }} mx={'auto'}>
          <Text fontWeight={'bold'} fontSize={'lg'} mb={3}>
            Students Queries
          </Text>

          <QueryRead />
        </Box>
      </Box>
    </PageWrapper>
  )
}
