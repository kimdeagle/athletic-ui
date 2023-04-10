import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";

export const getMemberList = createAsyncThunk('getMemberList', Apis.member.getMemberList)
export const getMember = createAsyncThunk('getMember', Apis.member.getMember)

const initialState = {
  memberList: [],
  member: {},
}

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    resetMemberList: (state) => {
      state.memberList = []
    },
    resetMember: (state) => {
      state.member = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemberList.fulfilled, (state, action) => {
        state.memberList = action.payload.data
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.member = action.payload.data
      })
  }
})

export const { resetMemberList, resetMember } = memberSlice.actions

export default memberSlice.reducer