import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../../apis"

export const getMenuList = createAsyncThunk('getMenuList', Apis.system.menu.getMenuList)
export const getUseMenuList = createAsyncThunk('getUseMenuList', Apis.system.menu.getUseMenuList)

const initialState = {
  menuList: [],
  useMenuList: []
}

export const menuSlice = createSlice({
  name: 'system/menu',
  initialState,
  reducers: {
    resetMenuList: (state) => {
      state.menuList = []
    },
    resetUseMenuList: (state) => {
      state.useMenuList = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenuList.fulfilled, (state, action) => {
        state.menuList = action.payload.data
      })
      .addCase(getUseMenuList.fulfilled, (state, action) => {
        state.useMenuList = action.payload.data
      })
  }
})

export const { resetMenuList, resetUseMenuList } = menuSlice.actions

export default menuSlice.reducer