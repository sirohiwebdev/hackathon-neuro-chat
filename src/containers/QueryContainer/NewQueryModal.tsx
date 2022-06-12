import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { FormikHelpers, useFormik } from 'formik'
import { isEmpty } from '@chakra-ui/utils'
import { addQueryFormSchema, NewQueryFormValues } from './schema'
import { useMutation } from 'react-query'
import { addQuery } from '../../lib/api'
import { useNavigate } from 'react-router'

interface NewQueryModalProps {
  isOpen: boolean
  onClose: () => void
}

export const NewQueryModal = ({ isOpen, onClose }: NewQueryModalProps) => {
  const addQueryMutation = useMutation('add-query', addQuery)
  const navigate = useNavigate()

  const handleCreateNew = (
    values: NewQueryFormValues,
    helpers: FormikHelpers<NewQueryFormValues>
  ) => {
    console.log('Handling', values)

    addQueryMutation.mutate(values, {
      onSuccess: (data) => {
        console.log(data)
        navigate(`/query/${data.id}`)

      },
      onError: (data) => {
        console.log(data)
      },

      onSettled: () => {
        helpers.setSubmitting(false)
      },
    })
  }
  const addNewQueryForm = useFormik<NewQueryFormValues>({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: addQueryFormSchema,
    onSubmit: handleCreateNew,
  })

  return (
    <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderWidth={1}>Ask Your Query</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            mb={3}
            isInvalid={Boolean(
              addNewQueryForm.touched.title && addNewQueryForm.errors.title
            )}
          >
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              placeholder={'What is your query'}
              onChange={addNewQueryForm.handleChange}
              onBlur={addNewQueryForm.handleBlur}
              value={addNewQueryForm.values.title}
            />
            <FormErrorMessage>{addNewQueryForm.errors.title}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={Boolean(
              addNewQueryForm.touched.description &&
                addNewQueryForm.errors.description
            )}
          >
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Add a little description to your query"
              name="description"
              onChange={addNewQueryForm.handleChange}
              onBlur={addNewQueryForm.handleBlur}
              value={addNewQueryForm.values.description}
            />
            <FormErrorMessage>
              {addNewQueryForm.errors.description}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={addNewQueryForm.submitForm}
            ml={2}
            colorScheme={'green'}
            isDisabled={
              !isEmpty(addNewQueryForm.errors) || addNewQueryForm.isSubmitting
            }
            isLoading={addNewQueryForm.isSubmitting}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
