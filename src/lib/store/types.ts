export interface BaseState<T = unknown> {
  pending: boolean
  error: boolean
  data: T
}
