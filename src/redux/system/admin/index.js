import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../../apis"

export const getAdminList = createAsyncThunk('getAdminList', Apis.system.admin.getAdminList)
export const getAdmin = createAsyncThunk('getAdmin', Apis.system.admin.getAdmin)

const initialState = {
  adminList: [],
  admin: {},
}

export const adminSlice = createSlice({
  name: 'system/admin',
  initialState,
  reducers: {
    resetAdminList: (state) => {
      state.adminList = []
    },
    resetAdmin: (state) => {
      state.admin = {}
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAdminList.fulfilled, (state, action) => {
        state.adminList = action.payload.data
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.admin = action.payload.data
      })
  }
})

export const { resetAdminList, resetAdmin } = adminSlice.actions

export default adminSlice.reducer