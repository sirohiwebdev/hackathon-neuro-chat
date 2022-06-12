import { useAuth } from '../components/Auth/AuthProvider'
import { UserRole } from '../lib/models'
import { useNavigate, useParams } from 'react-router'
import { HelpStudentContainer } from '../containers/HelpStudentContainer'
import { PageWrapper } from '../components/PageWrapper'

const HelpStudents = () => {
  const navigate = useNavigate()
  const { queryId } = useParams()
  const auth = useAuth()

  if (auth.user.role !== UserRole.MENTOR) {
    navigate('/')
  }

  if (!queryId) {
    navigate('/')
  }

  return (
    <PageWrapper pageTitle={'Mentor Dashboard'}>
      <HelpStudentContainer query={queryId as string} />
    </PageWrapper>
  )
}

export default HelpStudents
