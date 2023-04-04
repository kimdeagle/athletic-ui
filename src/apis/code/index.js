import * as apiService from "../apiService";

export const getCodeListByGroupIds = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/code',
    params
  }, thunkAPI)
}