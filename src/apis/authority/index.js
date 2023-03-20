import * as apiService from "../apiService";

export const getAuthorityList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/authority',
    params
  }, thunkAPI)
}

export const getAuthorityMenuList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/authority/menu',
    params
  }, thunkAPI)
}