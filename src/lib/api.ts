import axios, { AxiosResponse } from 'axios'
import { LoginFormValues } from '../pages/Login'
import { authStorage } from '../components/Auth/AuthProvider'
import {
  Communication,
  Query,
  QueryWithUserAndAssignee,
  Ticket,
  UserWithoutPassword,
} from './models'
const basePath = window.location.origin as string
interface ApiCallOptions<T = any, K = any> {
  params?: T
  auth?: boolean
  body?: K
}

const callAxios = async <T = any>(call: Promise<AxiosResponse<T>>) => {
  try {
    const response = await call
    return response.data
  } catch (e) {
    let error: any = e
    if (error.isAxiosError) {
      return Promise.reject(
        error.response?.data?.message || error.response?.data
      )
    }
    return Promise.reject(error.message)
  }
}

const getHeaders = (auth?: boolean) => {
  let headers: any = {
    'Content-Type': 'application/json',
  }

  if (auth) {
    headers['Authorization'] = `Bearer ${authStorage.get()}`
  }

  return headers
}

export const get = <T, K, R>(url: string, options: ApiCallOptions<T, K>) => {
  return callAxios(
    axios.get<R>(url, {
      params: options.params,
      headers: getHeaders(options.auth),
    })
  )
}
export const post = <T, K, R>(url: string, options: ApiCallOptions<T, K>) => {
  return callAxios(
    axios.post<R>(url, options.body, {
      params: options.params,
      headers: getHeaders(options.auth),
    })
  )
}
export const put = <T, K, R>(url: string, options: ApiCallOptions<T, K>) => {
  return callAxios(
    axios.put<R>(url, options.body, {
      params: options.params,
      headers: getHeaders(options.auth),
    })
  )
}

export const login = (params: LoginFormValues) =>
  post<any, LoginFormValues, { token: string }>(`${basePath}/auth/login`, {
    body: params,
  })

export const listQueries = (params: any) =>
  post<any, any, Query[]>(`${basePath}/api/query`, {
    auth: true,
    params: params,
    body: params,
  })

export const listQueriesByMe = (
  params: Partial<Query> & { withAssignee?: true }
) =>
  get<any, any, QueryWithUserAndAssignee[]>(`${basePath}/api/query/me`, {
    auth: true,
    params: params,
  })

export const getQueryById = (id: string) =>
  get<any, any, QueryWithUserAndAssignee>(`${basePath}/api/query/${id}`, {
    auth: true,
  })

export const addQuery = (params: Pick<Query, 'title' | 'description'>) =>
  post<any, Pick<Query, 'title' | 'description'>, any>(
    `${basePath}/api/query/new`,
    {
      auth: true,
      body: params,
    }
  )

export const updateQuery = ({
  id,
  params,
}: {
  id: string
  params: Partial<Query>
}) =>
  put<any, Partial<Query>, any>(`${basePath}/api/query/${id}`, {
    auth: true,
    body: params,
  })

export const getCommunicationsByQueryId = (queryId: string) =>
  get<any, Partial<Communication>, Communication[]>(
    `${basePath}/api/communications`,
    {
      auth: true,
      params: {
        queryId,
      },
    }
  )

export const createTicket = (queryId: string) =>
  post<any, Partial<Ticket>, any>(`${basePath}/api/tickets`, {
    auth: true,
    body: {
      queryId,
    },
  })

export const getTicketById = (id: string) =>
  get<any, any, Ticket>(`${basePath}/api/tickets/${id}`, {
    auth: true,
  })

export const updateTicket = ({
  id,
  params,
}: {
  id: string
  params: Partial<Ticket>
}) =>
  put<any, Partial<Ticket>, Ticket>(`${basePath}/api/tickets/${id}`, {
    auth: true,
    body: params,
  })
export const getTickets = (queryId: string) =>
  get<any, Partial<Ticket>, Ticket[]>(`${basePath}/api/tickets`, {
    auth: true,
    params: {
      queryId,
    },
  })

export const listUsers = (params: any) =>
  get<any, Partial<UserWithoutPassword>, UserWithoutPassword[]>(
    `${basePath}/api/users`,
    {
      auth: true,
      params,
    }
  )
