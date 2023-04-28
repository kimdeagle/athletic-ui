import {createSlice} from "@reduxjs/toolkit";

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
    resetAccessToken: (state) => {
      state.accessToken = null
      state.authenticated = false
      state.intervalFlag = false
    }
  },
})

export const { setAccessToken, resetAccessToken } = authSlice.actions

export default authSlice.reducer