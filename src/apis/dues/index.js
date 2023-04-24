import * as apiService from "../apiService";

export const getDuesList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/dues',
    params
  }, thunkAPI)
}

export const getDues = async (id, thunkAPI) => {
  return await apiService.GET({
    url: `/dues/${id}`
  }, thunkAPI)
}

export const deleteDues = async (id, thunkAPI) => {
  return await apiService.DELETE({
    url: `/dues/${id}`,
  }, thunkAPI)
}

export const addDues = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/dues',
    params
  }, thunkAPI)
}

export const updateDues = async (params, thunkAPI) => {
  return await apiService.PUT({
    url: '/dues',
    params
  }, thunkAPI)
}

export const getAmountThisMonth = async (thunkAPI) => {
  return await apiService.GET({
    url: '/statistics/dues/this-month'
  }, thunkAPI)
}