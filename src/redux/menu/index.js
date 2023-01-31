import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis"

export const getMenuList = createAsyncThunk('getMenuList', Apis.menu.getMenuList)

const initialState = {
  menuList: []
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuList: (state, action) => {
      state.menuList = action.payload
    },
    removeMenuList: (state) => {
      state.menuList = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenuList.fulfilled, (state, action) => {
        state.menuList = action.payload
      })
  }
})

export const { setMenuList, removeMenuList } = menuSlice.actions

export default menuSlice.reducer