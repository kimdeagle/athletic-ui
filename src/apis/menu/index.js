import * as apiService from "../apiService";

export const getMenuList = async (params, thunkAPI) => {
  return await apiService.get({
    url: '/menu',
    params
  }, thunkAPI)
}