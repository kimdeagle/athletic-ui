import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";

export const getCodeListByGroupIds = createAsyncThunk('getCodeListByGroupIds', Apis.code.getCodeListByGroupIds)

const initialState = {
  codeList: [],
}

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    resetCodeList: (state) => {
      state.codeList = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCodeListByGroupIds.fulfilled, (state, action) => {
        state.codeList = action.payload
      })
  }
})

export const { resetCodeList } = codeSlice.actions

export default codeSlice.reducer