import * as apiService from "../../apiService";

export const getMenuList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/system/menu',
    params
  }, thunkAPI)
}

export const getUseMenuList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/system/menu/use',
    params
  }, thunkAPI)
}

export const deleteMenu = async (id, thunkAPI) => {
  return await apiService.DELETE({
    url: `/system/menu/${id}`,
  }, thunkAPI)
}

export const addMenu = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/system/menu',
    params
  }, thunkAPI)
}

export const updateMenu = async (params, thunkAPI) => {
  return await apiService.PUT({
    url: '/system/menu',
    params
  }, thunkAPI)
}