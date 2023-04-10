import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";

export const getCodeListByGroupCodes = createAsyncThunk('getCodeListByGroupCodes', Apis.code.getCodeListByGroupCodes)

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
      .addCase(getCodeListByGroupCodes.fulfilled, (state, action) => {
        state.codeList = action.payload.data
      })
  }
})

export const { resetCodeList } = codeSlice.actions

export default codeSlice.reducer