import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";

export const getMemberStatisticsOfDashboard = createAsyncThunk('getMemberStatisticsOfDashboard', Apis.statistics.getMemberStatisticsOfDashboard)
export const getDuesStatisticsOfDashboard = createAsyncThunk('getDuesStatisticsOfDashboard', Apis.statistics.getDuesStatisticsOfDashboard)

const initialState = {
  memberStatisticsList: [],
  duesStatisticsList: [],
}

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    resetMemberStatisticsList: (state) => {
      state.memberStatisticsList = []
    },
    resetDuesStatisticsList: (state) => {
      state.duesStatisticsList = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMemberStatisticsOfDashboard.fulfilled, (state, action) => {
        state.memberStatisticsList = action.payload.data
      })
      .addCase(getDuesStatisticsOfDashboard.fulfilled, (state, action) => {
        state.duesStatisticsList = action.payload.data
      })
  }
})

export const { resetMemberStatisticsList, resetDuesStatisticsList } = statisticsSlice.actions

export default statisticsSlice.reducer