import * as yup from 'yup'

export interface NewQueryFormValues {
  title: string
  description: string
}
export const addQueryFormSchema: yup.SchemaOf<NewQueryFormValues> = yup
  .object()
  .shape({
    title: yup.string().required().min(10, 'Please provide a proper title'),
    description: yup
      .string()
      .required()
      .max(200, 'Describe in less than 200 characters')
      .min(10, 'Add a bit more description'),
  })
