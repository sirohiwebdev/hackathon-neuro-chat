export enum UserRole {
  MENTOR = 'mentor',
  STUDENT = 'student',
}
export interface User {
  name: string
  username: string
  password: string
  role: UserRole
  id: string
}
export type UserWithoutPassword = Omit<User, 'password'>
