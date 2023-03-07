import axios from "axios";
import { saveAs } from "file-saver";

const ACTIONS_DOWNLOAD_EXCEL = 'downloadExcel'

const downloadExcelResponse = { code: 200, message: '엑셀 다운로드를 성공하였습니다.' }

const downloadExcel = (response) => {
  let filename = response.headers['content-disposition']
  filename = filename.substring(filename.indexOf('filename=')).replace('filename=', '')
  const blob = new Blob([response.data], { type: response.headers['content-type'], encoding: 'utf-8' })
  saveAs(blob, filename)
}

const request = async (data, thunkAPI) => {
  return await axios({
    method: data.method,
    baseURL: process.env.REACT_APP_BASE_URL,
    url: data.url,
    ...(data.action === ACTIONS_DOWNLOAD_EXCEL && {responseType: 'blob'}),
    ...(data.headers && {headers: data.headers}),
    [data.method === 'get' ? 'params' : 'data']: data.params,
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

export const GET = async (params, thunkAPI) => {
  return await request({
    method: 'get',
    ...params
  }, thunkAPI)
}

export const POST = async (params, thunkAPI) => {
  return await request({
    method: 'post',
    ...params
  }, thunkAPI)
}

export const PUT = async (params, thunkAPI) => {
  return await request({
    method: 'put',
    ...params
  }, thunkAPI)
}

export const DELETE = async (params, thunkAPI) => {
  return await request({
    method: 'delete',
    ...params
  }, thunkAPI)
}

export const DOWNLOAD_EXCEL = async (params, thunkAPI) => {
  return await request({
    method: 'get',
    action: ACTIONS_DOWNLOAD_EXCEL,
    ...params
  }, thunkAPI)
}