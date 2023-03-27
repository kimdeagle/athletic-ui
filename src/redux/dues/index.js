import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";

export const getDuesList = createAsyncThunk('getDuesList', Apis.dues.getDuesList)
export const getDues = createAsyncThunk('getDues', Apis.dues.getDues)
export const getAmountThisMonth = createAsyncThunk('getAmountThisMonth', Apis.dues.getAmountThisMonth)

const initialState = {
  duesList: [],
  dues: {},
  amountThisMonth: [],
}

export const duesSlice = createSlice({
  name: 'dues',
  initialState,
  reducers: {
    resetDuesList: (state) => {
      state.duesList = []
    },
    resetDues: (state) => {
      state.dues = {}
    },
    resetAmountThisMonth: (state) => {
      state.amountThisMonth = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDuesList.fulfilled, (state, action) => {
        state.duesList = action.payload
      })
      .addCase(getDues.fulfilled, (state, action) => {
        state.dues = action.payload
      })
      .addCase(getAmountThisMonth.fulfilled, (state, action) => {
        state.amountThisMonth = action.payload
      })
  }
})

export const { resetDuesList, resetDues, resetAmountThisMonth } = duesSlice.actions

export default duesSlice.reducer