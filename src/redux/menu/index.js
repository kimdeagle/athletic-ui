import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as Apis from "../../apis"

export const getMenuList = createAsyncThunk('getMenuList', Apis.menu.getMenuList)
export const getUseMenuList = createAsyncThunk('getUseMenuList', Apis.menu.getUseMenuList)

const initialState = {
  menuList: [],
  useMenuList: []
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    resetMenuList: (state) => {
      state.menuList = []
    },
    resetUseMenuList: (state) => {
      state.useMenuList = []
    },
    resetMenuState: (state) => {
      state.menuList = []
      state.useMenuList = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenuList.fulfilled, (state, action) => {
        state.menuList = action.payload
      })
      .addCase(getUseMenuList.fulfilled, (state, action) => {
        state.useMenuList = action.payload
      })
  }
})

export const { resetMenuList, resetUseMenuList, resetMenuState } = menuSlice.actions

export default menuSlice.reducer