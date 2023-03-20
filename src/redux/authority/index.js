import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";

export const getAuthorityList = createAsyncThunk('getAuthorityList', Apis.authority.getAuthorityList)
export const getAuthorityMenuList = createAsyncThunk('getAuthorityMenuList', Apis.authority.getAuthorityMenuList)

const initialState = {
  authorityList: [],
  authorityMenuList: [],
}

export const authoritySlice = createSlice({
  name: 'authority',
  initialState,
  reducers: {
    resetAuthorityList: (state) => {
      state.authorityList = []
    },
    resetAuthorityMenuList: (state) => {
      state.authorityMenuList = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAuthorityList.fulfilled, (state, action) => {
        state.authorityList = action.payload
      })
      .addCase(getAuthorityMenuList.fulfilled, (state, action) => {
        state.authorityMenuList = action.payload
      })
  }
})

export const { resetAuthorityList, resetAuthorityMenuList } = authoritySlice.actions

export default authoritySlice.reducer