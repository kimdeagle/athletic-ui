import * as apiService from "../apiService";

export const getUser = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/system/admin/user',
    params
  }, thunkAPI)
}