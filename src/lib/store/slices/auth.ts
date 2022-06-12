import { createSlice } from '@reduxjs/toolkit'
import { getToken } from '../thunks/auth'
import { BaseState } from '../types'
import { AppState } from '../index'

export interface Auth {
  token: string
}
const initialState: BaseState<Auth> = {
  pending: false,
  data: {
    token: '',
  },
  error: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.pending = true
      })
      .addCase(getToken.fulfilled, (state, { payload }) => {
        // When the API call is successful, and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false
        state.data = { token: payload }
      })
      .addCase(getToken.rejected, (state) => {
        state.pending = false
        state.error = true
      })
  },
})

export const authSelector = (state: AppState) => state.auth
export default authSlice.reducer
