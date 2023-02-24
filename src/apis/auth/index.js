import * as apiService from "../apiService";

export const login = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/auth/login',
    params
  }, thunkAPI)
}

export const join = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/auth/join',
    params
  }, thunkAPI)
}

export const resetPassword = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/auth/reset-password',
    params
  }, thunkAPI)
}

export const reIssueAccessToken = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/auth/re-issue/access',
    headers:{Authorization: `Bearer ${params.refreshToken}`},
    params
  }, thunkAPI)
}

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

export const logout = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/auth/logout',
    params
  }, thunkAPI)
}