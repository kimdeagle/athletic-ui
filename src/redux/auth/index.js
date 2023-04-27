import {createSlice} from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  accessToken: null,
  authenticated: false,
  intervalFlag: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
      state.authenticated = true
      state.intervalFlag = true
    },
  },
  extraReducers: builder => {
    builder
      .addCase(PURGE, () => initialState)
  }
})

export const { setAccessToken } = authSlice.actions

export default authSlice.reducer