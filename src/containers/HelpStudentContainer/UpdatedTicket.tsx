import { Ticket, TicketStatus, UserRole } from '../../lib/models'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
} from '@chakra-ui/react'
import { isEmpty } from '@chakra-ui/utils'
import React, { useEffect } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import { ticketFormSchema } from './ticket-form-schema'
import { useMutation } from 'react-query'
import { listUsers, updateTicket } from '../../lib/api'
import { useNavigate } from 'react-router'

interface UpdatedTicketProps {
  isOpen: boolean
  onClose: () => void
  ticket: Ticket
  onTicketUpdate: () => void
}

export const UpdatedTicket: React.FC<UpdatedTicketProps> = ({
  isOpen,
  onClose,
  ticket,
  onTicketUpdate,
}) => {
  const navigate = useNavigate()
  const getMentors = useMutation('get-mentors-data', listUsers)
  const updateTicketDetails = useMutation('update-ticket-data', updateTicket)

  useEffect(() => {
    getMentors.mutate({ role: UserRole.MENTOR })
  }, [])

  const handleTicketFormSubmit = (
    values: Ticket,
    helpers: FormikHelpers<Ticket>
  ) => {
    updateTicketDetails.mutate(
      {
        id: ticket.id,
        params: {
          assignee: values.assignee,
          status: values.status,
        },
      },
      {
        onSuccess: () => {
          if (values.assignee !== ticket.assignee) {
            navigate('/')
          } else {
            onTicketUpdate()
          }
        },
        onSettled: () => {
          helpers.setSubmitting(false)
          onClose()
        },
      }
    )
  }

  const ticketForm = useFormik<Ticket>({
    initialValues: ticket,
    onSubmit: handleTicketFormSubmit,
    validationSchema: ticketFormSchema,
    validateOnChange: true,
  })

  console.log(ticketForm.errors)

  return (
    <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderWidth={1}>Update Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            mb={3}
            isInvalid={Boolean(
              ticketForm.touched.status && ticketForm.errors.status
            )}
          >
            <FormLabel>Status</FormLabel>
            <RadioGroup
              name={'status'}
              value={ticketForm.values.status}
              onChange={(e) => ticketForm.setFieldValue('status', e)}
            >
              <Radio value={TicketStatus.OPEN}>Open</Radio> &nbsp; &nbsp;
              <Radio value={TicketStatus.PROGRESS}>Progress</Radio> &nbsp;
              &nbsp;
              <Radio value={TicketStatus.CLOSED}>Closed</Radio> &nbsp; &nbsp;
            </RadioGroup>
            <FormErrorMessage>{ticketForm.errors.status}</FormErrorMessage>
          </FormControl>

          <FormControl
            mb={3}
            isInvalid={Boolean(
              ticketForm.touched.assignee && ticketForm.errors.assignee
            )}
          >
            <FormLabel>Assignee</FormLabel>
            <Select
              name={'assignee'}
              value={ticketForm.values.assignee}
              onChange={ticketForm.handleChange}
            >
              {!getMentors.isLoading && getMentors.data ? (
                getMentors.data.map((d) => (
                  <option value={d.id}>{d.name}</option>
                ))
              ) : (
                <Skeleton h={'30px'} w={'60px'} />
              )}
            </Select>
            <FormErrorMessage>{ticketForm.errors.assignee}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={ticketForm.submitForm}
            ml={2}
            colorScheme={'green'}
            isDisabled={!isEmpty(ticketForm.errors) || ticketForm.isSubmitting}
            isLoading={ticketForm.isSubmitting}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
