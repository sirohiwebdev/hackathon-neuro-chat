import { Mentor } from '../mentor/Mentor'
import { User } from '../user/User'

export enum QueryStatus {
  OPEN = 'open',
  PENDING = 'pending',
  RESOLVED = 'resolved',
}

export interface Query {
  from: string
  assignee: string
  status: QueryStatus
  id: string
  title: string
  description: string
  resolvedOn?: string
}

export type QueryWithUserAndAssignee = Omit<Query, 'assignee' | 'from'> & {
  assignee: Omit<User, 'password'>
  from: Omit<User, 'password'>
}
