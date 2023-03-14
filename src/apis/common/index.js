import * as apiService from "../apiService";

export const uploadExcel = async (params, thunkAPI) => {
  return await apiService.UPLOAD_EXCEL({
    url: params.uploadUrl,
    headers: { 'Content-Type': 'multipart/form-data' },
    params: params.file,
  }, thunkAPI)
}

export const downloadExcel = async (params, thunkAPI) => {
  return await apiService.DOWNLOAD_EXCEL({
    url: params.downloadUrl,
    params,
  }, thunkAPI)
}