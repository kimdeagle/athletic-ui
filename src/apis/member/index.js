import * as apiService from "../apiService";

export const getMemberList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/member',
    params
  }, thunkAPI)
}