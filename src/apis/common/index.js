import * as apiService from "../apiService";

export const uploadExcel = async (params, thunkAPI) => {
  const {uploadUrl:url, file} = params
  return await apiService.UPLOAD_EXCEL({
    url,
    params: file,
    headers: { 'Content-Type': 'multipart/form-data' },
  }, thunkAPI)
}

export const downloadExcel = async (params, thunkAPI) => {
  const {downloadUrl:url, ...other} = params
  return await apiService.DOWNLOAD_EXCEL({
    url,
    params: other,
  }, thunkAPI)
}