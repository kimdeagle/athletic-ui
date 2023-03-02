import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  accessToken: null,
  accessTokenExpiresIn: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.authenticated = true
      state.accessToken = action.payload.accessToken
      state.accessTokenExpiresIn = action.payload.accessTokenExpiresIn
    },
    resetAccessToken: (state) => {
      state.authenticated = false
      state.accessToken = null
      state.accessTokenExpiresIn = null
    },
  },
})

export const { setAccessToken, resetAccessToken } = authSlice.actions

export default authSlice.reducer