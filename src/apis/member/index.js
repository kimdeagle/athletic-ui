import * as apiService from "../apiService";

export const getMemberList = async (params, thunkAPI) => {
  return await apiService.GET({
    url: '/member',
    params
  }, thunkAPI)
}

export const addMember = async (params, thunkAPI) => {
  return await apiService.POST({
    url: '/member',
    params
  }, thunkAPI)
}

export const getMember = async (memberNo, thunkAPI) => {
  return await apiService.GET({
    url: `/member/${memberNo}`
  }, thunkAPI)
}

export const updateMember = async (params, thunkAPI) => {
  return await apiService.PUT({
    url: '/member',
    params
  }, thunkAPI)
}

export const deleteMember = async (params, thunkAPI) => {
  return await apiService.DELETE({
    url: '/member',
    params
  }, thunkAPI)
}

export const downloadExcel = async (params, thunkAPI) => {
  return await apiService.DOWNLOAD_EXCEL({
    url: '/member/excel',
    params
  }, thunkAPI)
}