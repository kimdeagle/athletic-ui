import * as apiService from "../apiService";

export const getMenuList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/menu',
    params
  }, thunkAPI)
}