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

export const refresh = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/auth/refresh'
  }, thunkAPI)
}

export const logout = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/auth/logout',
    params
  }, thunkAPI)
}

export const getCurrentUser = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/auth/user/current',
    params
  }, thunkAPI)
}

export const getUseMenuList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/system/menu/use',
    params
  }, thunkAPI)
}