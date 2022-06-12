import React, { useEffect } from 'react'
import { User, UserWithoutPassword } from '../../lib/models'
import * as jwt from 'react-jwt'
import { Spinner } from '@chakra-ui/react'

export const authStorage = {
  set: (token: string) => localStorage.setItem('token', token),
  get: () => localStorage.getItem('token'),
  clear: () => localStorage.removeItem('token'),
}
interface AuthContextType {
  user: any
  signIn: (user: string, callback: VoidFunction) => void
  signOut: (callback: VoidFunction) => void
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  signIn: (t) => {},
  signOut: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let [user, setUser] = React.useState<UserWithoutPassword>()
  let [loading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    const token = authStorage.get()
    if (token) {
      setUser(jwt.decodeToken(token) as UserWithoutPassword)
    }
    setLoading(false)
    return () => {}
  }, [])

  const signIn = (token: string, callback: VoidFunction) => {
    setLoading(true)
    authStorage.set(token)
    setUser(jwt.decodeToken(token) as UserWithoutPassword)
    setLoading(false)
    callback()
  }

  const signOut = (callback: VoidFunction) => {
    authStorage.clear()
    // @ts-ignore
    setUser(null)
    callback()
  }

  let value = { user, signIn, signOut }

  if(loading){
    return <Spinner/>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => {
  return React.useContext(AuthContext)
}
