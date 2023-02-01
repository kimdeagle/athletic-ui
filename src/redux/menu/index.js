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
        state.menuList = processMenuList(action.payload).filter(menu => menu.upMenuNo === null)
      })
  }
})

const processMenuList = (menuList) => {
  menuList.map(menu => {
    const children = menuList.filter(m => menu.menuNo === m.upMenuNo).sort((a, b) => a.sortSeq - b.sortSeq)
    if (children) {
      menu.children = processMenuList(children)
    }
  })
  return menuList
}

export const { setMenuList, removeMenuList } = menuSlice.actions

export default menuSlice.reducer