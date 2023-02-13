import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis"

export const getMyInfo = createAsyncThunk('getMyInfo', Apis.auth.getMyInfo)

const initialState = {
  authenticated: false,
  accessToken: null,
  accessTokenExpiresIn: null,
  admin: {}
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
    resetMyInfo: (state) => {
      state.admin = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.admin = action.payload
      })
  }
})

export const { setAccessToken, resetAccessToken, resetMyInfo } = authSlice.actions

export default authSlice.reducer