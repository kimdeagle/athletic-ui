import * as apiService from "../apiService";

export const getMyInfo = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/admin/my',
    params
  }, thunkAPI)
}

export const changePassword = async (params, thunkAPI) => {
  return await apiService.PUT({
    url: '/admin/password',
    params
  }, thunkAPI)
}

export const out = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/admin/out',
    params
  }, thunkAPI)
}