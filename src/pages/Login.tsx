import * as yup from 'yup'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  useToast,
} from '@chakra-ui/react'
import { Form, FormikHelpers, useFormik } from 'formik'
import { UserRole } from '../lib/models'
import { isEmpty } from '@chakra-ui/utils'
import { useMutation } from 'react-query'
import { login } from '../lib/api'
import { useNavigate } from 'react-router'
import { useAuth } from '../components/Auth/AuthProvider'

export interface LoginFormValues {
  username: string
  password: string
  role: UserRole
}

const loginFormSchema: yup.SchemaOf<LoginFormValues> = yup.object().shape({
  username: yup.string().required().min(6),
  password: yup.string().required().min(8).max(16),
  role: yup.mixed<UserRole>().required(),
})

const LoginPage = () => {
  const loginMutation = useMutation('login', login)
  const toast = useToast()
  const auth = useAuth()
  const navigate = useNavigate()
  const handleLoginFormSubmit = (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => {
    loginMutation.mutate(values, {
      onSettled: () => {
        helpers.setSubmitting(false)
      },
      onSuccess: (data) => {
        console.log(data)
        auth.signIn(data.token, () => {
          navigate('/')
        })
      },
      onError: (e) => {
        console.log(e)
        toast({
          title: 'Error',
          description: e as string,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
    })
  }

  const loginForm = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
      role: UserRole.STUDENT,
    },

    onSubmit: handleLoginFormSubmit,
    validationSchema: loginFormSchema,
    validateOnBlur: true,
  })

  return (
    <Flex h={'100vh'} w={'full'} alignItems={'center'}>
      <Box
        w={{ base: 'full', md: 'md' }}
        mx={'auto'}
        mt={5}
        borderWidth={1}
        p={5}
      >
        <Heading mb={4}>Login</Heading>
        <form onSubmit={loginForm.handleSubmit}>
          <FormControl
            mb={3}
            isInvalid={Boolean(
              loginForm.touched.username && loginForm.errors.username
            )}
          >
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              placeholder={'Enter username'}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.username}
            />
            <FormErrorMessage>{loginForm.errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl
            mb={3}
            isInvalid={Boolean(
              loginForm.touched.password && loginForm.errors.password
            )}
          >
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              placeholder={'Enter password'}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              type={'password'}
              value={loginForm.values.password}
            />
            <FormErrorMessage>{loginForm.errors.password}</FormErrorMessage>
          </FormControl>
          <RadioGroup
            name={'role'}
            value={loginForm.values.role}
            onChange={(e) => loginForm.setFieldValue('role', e)}
          >
            <Radio value={UserRole.STUDENT}>Student</Radio> &nbsp; &nbsp;
            <Radio value={UserRole.MENTOR}>Mentor</Radio>
          </RadioGroup>

          <Button
            mt={2}
            w={'full'}
            type={"submit"}
            colorScheme={'blue'}
            onClick={loginForm.submitForm}
            isDisabled={loginForm.isSubmitting || !isEmpty(loginForm.errors)}
            isLoading={loginForm.isSubmitting}
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  )
}

export default LoginPage
