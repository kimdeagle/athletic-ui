import * as apiService from "../apiService";

export const getCodeListByGroupCodes = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/code',
    params
  }, thunkAPI)
}