import { PageWrapper } from '../components/PageWrapper'
import { QueryDetailsContainer } from '../containers/QueryDetailsContainer'
import { useNavigate, useParams } from 'react-router'
import { useMutation } from 'react-query'
import { getQueryById } from '../lib/api'
import { useEffect } from 'react'
import { Spinner } from '@chakra-ui/react'

const QueryDetails = () => {
  const { queryId } = useParams()
    const navigate = useNavigate()
  const getQuery = useMutation('query', getQueryById)

  useEffect(() => {
    queryId && getQuery.mutate(queryId as string, {})

    return () => {}
  }, [queryId])


  if(!queryId){
    navigate("/")
  }

  return (
    <PageWrapper pageTitle={'Query Details'}>
      {getQuery.isLoading && <Spinner />}
      {getQuery.data && <QueryDetailsContainer query={getQuery.data} />}
    </PageWrapper>
  )
}

export default QueryDetails
