import * as apiService from "../../apiService";

export const changePassword = async (params, thunkAPI) => {
  return await apiService.PUT({
    url: '/system/admin/password',
    params
  }, thunkAPI)
}

export const out = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/system/admin/out',
    params
  }, thunkAPI)
}

export const getAdminList = async (thunkAPI) => {
  return await apiService.GET({
    url: '/system/admin'
  }, thunkAPI)
}

export const getAdmin = async (id, thunkAPI) => {
  return await apiService.GET({
    url: `/system/admin/${id}`
  }, thunkAPI)
}