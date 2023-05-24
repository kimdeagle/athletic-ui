import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../../apis"

export const getMenuList = createAsyncThunk('getMenuList', Apis.system.menu.getMenuList)

const initialState = {
  menuList: [],
}

export const menuSlice = createSlice({
  name: 'system/menu',
  initialState,
  reducers: {
    resetMenuList: (state) => {
      state.menuList = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenuList.fulfilled, (state, action) => {
        state.menuList = action.payload.data
      })
  }
})

export const { resetMenuList } = menuSlice.actions

export default menuSlice.reducer