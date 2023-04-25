import {createSlice} from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  authenticated: false,
  accessToken: null,
  accessTokenExpiresIn: null,
  user: {},
  intervalFlag: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthInfo: (state, action) => {
      state.authenticated = true
      state.accessToken = action.payload.accessToken
      state.accessTokenExpiresIn = action.payload.accessTokenExpiresIn
      state.user = action.payload.user
      state.intervalFlag = true
    },
  },
  extraReducers: builder => {
    builder
      .addCase(PURGE, () => initialState)
  }
})

export const { setAuthInfo } = authSlice.actions

export default authSlice.reducer