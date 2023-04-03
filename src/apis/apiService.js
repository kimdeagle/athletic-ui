import axios from "axios";
import { saveAs } from "file-saver";
import qs from "qs";

const ACTIONS_DOWNLOAD_EXCEL = 'downloadExcel'

const downloadExcelResponse = { code: 200, message: '엑셀 다운로드를 성공하였습니다.' }

const downloadExcel = (response) => {
  let filename = response.headers['content-disposition']
  filename = decodeURI(filename.substring(filename.indexOf('filename=')).replace('filename=', ''))
  const blob = new Blob([response.data], { type: response.headers['content-type'] })
  saveAs(blob, filename)
}

const request = async (data, thunkAPI) => {
  return await axios({
    method: data.method,
    baseURL: process.env.REACT_APP_BASE_URL,
    url: data.url,
    ...(data.action === ACTIONS_DOWNLOAD_EXCEL && {responseType: 'blob'}),
    ...(data.headers && {headers: data.headers}),
    data: data.params,
  }, thunkAPI)
    .then(res => {
      if (data.action === ACTIONS_DOWNLOAD_EXCEL) {
        downloadExcel(res)
        return downloadExcelResponse
      } else {
        return res.data
      }
    })
}

export const GET = async (data, thunkAPI) => {
  return await request({
    method: 'get',
    url: data.url + (data.params ? '?' + qs.stringify(data.params, {arrayFormat: 'repeat'}) : '')
  }, thunkAPI)
}

export const POST = async (data, thunkAPI) => {
  return await request({
    method: 'post',
    ...data
  }, thunkAPI)
}

export const PUT = async (data, thunkAPI) => {
  return await request({
    method: 'put',
    ...data
  }, thunkAPI)
}

export const DELETE = async (data, thunkAPI) => {
  return await request({
    method: 'delete',
    ...data
  }, thunkAPI)
}

export const DOWNLOAD_EXCEL = async (data, thunkAPI) => {
  return await request({
    method: 'get',
    action: ACTIONS_DOWNLOAD_EXCEL,
    ...data
  }, thunkAPI)
}

export const UPLOAD_EXCEL = async (data, thunkAPI) => {
  return await request({
    method: 'post',
    ...data
  }, thunkAPI)
}