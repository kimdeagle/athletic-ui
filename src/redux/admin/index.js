import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis"

export const getMyInfo = createAsyncThunk('getMyInfo', Apis.admin.getMyInfo)

const initialState = {
  admin: {}
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.admin = {}
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.admin = action.payload
      })
  }
})

export const { resetAdmin } = adminSlice.actions

export default adminSlice.reducer