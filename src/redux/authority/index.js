import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";

export const getAuthorityList = createAsyncThunk('getAuthorityList', Apis.authority.getAuthorityList)

const initialState = {
  authorityList: [],
}

export const authoritySlice = createSlice({
  name: 'authority',
  initialState,
  reducers: {
    resetAuthorityList: (state) => {
      state.authorityList = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAuthorityList.fulfilled, (state, action) => {
        state.authorityList = action.payload.data
      })
  }
})

export const { resetAuthorityList } = authoritySlice.actions

export default authoritySlice.reducer