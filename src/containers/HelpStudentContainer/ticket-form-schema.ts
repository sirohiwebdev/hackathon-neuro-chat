import * as yup from 'yup'
import { Ticket, TicketStatus } from '../../lib/models'

export const ticketFormSchema: yup.SchemaOf<Ticket> = yup.object().shape({
  queryId: yup.string().required(),
  assignee: yup.string().required(),
  status: yup.mixed<TicketStatus>().required(),
  id: yup.string().required(),
})
