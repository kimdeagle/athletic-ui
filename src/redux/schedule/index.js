import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";

export const getScheduleList = createAsyncThunk('getScheduleList', Apis.schedule.getScheduleList)

const initialState = {
  scheduleList: [],
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    resetScheduleList: (state) => {
      state.scheduleList = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getScheduleList.fulfilled, (state, action) => {
        state.scheduleList = action.payload.data
      })
  }
})

export const { resetScheduleList } = scheduleSlice.actions

export default scheduleSlice.reducer