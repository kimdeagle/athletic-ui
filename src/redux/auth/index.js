import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";

export const getCurrentUser = createAsyncThunk('getCurrentUser', Apis.auth.getCurrentUser)
export const getUseMenuList = createAsyncThunk('getUseMenuList', Apis.auth.getUseMenuList)

const initialState = {
  isLoggedIn: false,
  user: {},
  useMenuList: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user
      state.useMenuList = action.payload.useMenuList
    },
    resetAuth: (state) => {
      state.isLoggedIn = false
      state.user = {}
      state.useMenuList = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.data
      })
      .addCase(getUseMenuList.fulfilled, (state, action) => {
        state.useMenuList = action.payload.data
      })
  }
})

export const { setAuth, resetAuth } = authSlice.actions

export default authSlice.reducer