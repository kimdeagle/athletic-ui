import * as apiService from "../apiService";

export const getMemberStatisticsOfDashboard = async (thunkAPI) => {
  return await apiService.GET({
    url: '/statistics/dashboard/member'
  }, thunkAPI)
}

export const getDuesStatisticsOfDashboard = async (thunkAPI) => {
  return await apiService.GET({
    url: '/statistics/dashboard/dues'
  }, thunkAPI)
}