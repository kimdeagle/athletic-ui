import * as apiService from "../apiService";
import {BEARER_PREFIX} from "../../utils/const";

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
    headers:{Authorization: BEARER_PREFIX + params.refreshToken},
  }, thunkAPI)
}

export const logout = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/auth/logout',
    params
  }, thunkAPI)
}