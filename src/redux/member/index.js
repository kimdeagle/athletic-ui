import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";
import {generateGridIdByNumber} from "../../utils/util";

export const getMemberList = createAsyncThunk('getMemberList', Apis.member.getMemberList)

const initialState = {
  memberList: []
}

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    resetMemberList: (state) => {
      state.memberList = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemberList.fulfilled, (state, action) => {
        state.memberList = generateGridIdByNumber(action.payload)
      })
  }
})

export const { resetMemberList } = memberSlice.actions

export default memberSlice.reducer