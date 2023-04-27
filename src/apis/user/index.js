import * as apiService from "../apiService";

export const getUser = async (params, thunkAPI) => {
  return await apiService.GET({
    url: 'admin/user',
    params
  }, thunkAPI)
}