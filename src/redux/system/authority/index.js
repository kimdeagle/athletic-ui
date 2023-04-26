import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../../apis";

export const getAuthorityList = createAsyncThunk('getAuthorityList', Apis.system.authority.getAuthorityList)
export const getAuthority = createAsyncThunk('getAuthority', Apis.system.authority.getAuthority)

const initialState = {
  authorityList: [],
  authority: {},
}

export const authoritySlice = createSlice({
  name: 'system/authority',
  initialState,
  reducers: {
    resetAuthorityList: (state) => {
      state.authorityList = []
    },
    resetAuthority: (state) => {
      state.authority = {}
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAuthorityList.fulfilled, (state, action) => {
        state.authorityList = action.payload.data
      })
      .addCase(getAuthority.fulfilled, (state, action) => {
        state.authority = action.payload.data
      })
  }
})

export const { resetAuthorityList, resetAuthority } = authoritySlice.actions

export default authoritySlice.reducer