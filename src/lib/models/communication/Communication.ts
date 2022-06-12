export interface Communication {
  from: string
  to: string
  queryId: string
  ticketId?: string
  id: string
  content: string
  timestamp: number
}
