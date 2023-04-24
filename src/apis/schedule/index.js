import * as apiService from "../apiService";

export const getScheduleList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/schedule',
    params
  }, thunkAPI)
}

export const deleteSchedule = async (id, thunkAPI) => {
  return await apiService.DELETE({
    url: `/schedule/${id}`,
  }, thunkAPI)
}

export const addSchedule = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/schedule',
    params
  }, thunkAPI)
}

export const updateSchedule = async (params, thunkAPI) => {
  return await apiService.PUT({
    url: '/schedule',
    params
  }, thunkAPI)
}

export const getScheduleListOfDashboard = async (thunkAPI) => {
  return await apiService.GET({
    url: '/schedule/dashboard'
  }, thunkAPI)
}