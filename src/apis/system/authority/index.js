import * as apiService from "../../apiService";

export const getAuthorityList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/system/authority',
    params
  }, thunkAPI)
}

export const getAuthority = async (id, thunkAPI) => {
  return await apiService.GET({
    url: `/system/authority/${id}`
  }, thunkAPI)
}

export const deleteAuthorities = async (params, thunkAPI) => {
  return await apiService.DELETE({
    url: '/system/authority',
    params
  }, thunkAPI)
}

export const addAuthority = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/system/authority',
    params
  }, thunkAPI)
}

export const updateAuthority = async (params, thunkAPI) => {
  return await apiService.PUT({
    url: '/system/authority',
    params
  }, thunkAPI)
}