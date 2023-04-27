import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis";
import {PURGE} from "redux-persist";

export const getUser = createAsyncThunk('getUser', Apis.user.getUser)

const initialState = {
  user: {},
  loginAt: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginAt: (state, action) => {
      state.loginAt = action.payload
    },
    resetUser: (state) => {
      state.user = {}
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data
      })
      .addCase(PURGE, () => initialState)
  }
})

export const { setLoginAt, resetUser } = userSlice.actions

export default userSlice.reducer