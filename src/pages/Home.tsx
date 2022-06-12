import {Box} from "@chakra-ui/react";
import { useAuth } from '../components/Auth/AuthProvider'
import { UserRole } from '../lib/models'
import { StudentDashboard } from '../containers/StudentDashboard'
import { MentorDashboard } from '../containers/MentorDashboard'


const HomePage = () => {

    const auth = useAuth();

    console.log(auth.user)
    if (auth.user.role === UserRole.STUDENT) {
      return <StudentDashboard />
    }
    return <MentorDashboard />

}


export default HomePage