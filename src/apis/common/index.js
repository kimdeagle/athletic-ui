import * as apiService from "../apiService";

export const uploadExcel = async (params, thunkAPI) => {
  const {uploadUrl:url, file} = params
  return await apiService.UPLOAD_EXCEL({
    url,
    params: file,
    headers: { 'content-type': 'multipart/form-data' },
  }, thunkAPI)
}

export const downloadFile = async (params, thunkAPI) => {
  const {downloadUrl:url, ...other} = params
  return await apiService.DOWNLOAD_FILE({
    url,
    params: other,
  }, thunkAPI)
}