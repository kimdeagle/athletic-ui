import axios from "axios";
import { saveAs } from "file-saver";
import qs from "qs";

/* 파일 다운로드 액션 구분 */
const ACTIONS_DOWNLOAD_FILE = "downloadFile"

/* 파일명 구분 문자 */
const FILENAME_INDEX_CHAR = '\'\''

const downloadFileResponse = { status: 200, message: '다운로드를 성공하였습니다.' }

const downloadFile = (response) => {
  let filename = response.headers['content-disposition']
  filename = decodeURI(filename.substring(filename.indexOf(FILENAME_INDEX_CHAR)).replace(FILENAME_INDEX_CHAR, ''))
  const blob = new Blob([response.data], { type: response.headers['content-type'] })
  saveAs(blob, filename)
}

const request = async (data, thunkAPI) => {
  return await axios({
    method: data.method,
    baseURL: process.env.REACT_APP_BASE_URL,
    url: data.url,
    ...(data.action === ACTIONS_DOWNLOAD_FILE && {responseType: 'blob'}),
    ...(data.headers && {headers: data.headers}),
    data: data.params,
  }, thunkAPI)
    .then(res => {
      if (data.action === ACTIONS_DOWNLOAD_FILE) {
        downloadFile(res)
        return downloadFileResponse
      } else {
        return res.data
      }
    })
    .catch(async (e) => {
      /* responseType: blob 일 때, error 처리 */
      const { status, message } = data.action === ACTIONS_DOWNLOAD_FILE ? JSON.parse(await e.response.data.text()) : e.response.data
      
      /* 에러 처리 방법 */
      /* 1. Apis 직접 호출할 경우
       *   - try catch 제거 및 단순화 작업
       */
      return { status, message }
      
      /* 2. redux에서 호출할 경우 (rejected)
       *   - redux state (code, message) 추가
       *   - 호출 파일에 useSelector (code, message) 추가, dispatch로 호출, useEffect에서 code, message로 snackbar 호출
       *   - 수정 범위가 너무 크다...
       *   - (일단 1번 방법으로 수정 작업)
       */
      // return thunkAPI.rejectWithValue({code, message})
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

export const UPLOAD_EXCEL = async (data, thunkAPI) => {
  return await request({
    method: 'post',
    ...data
  }, thunkAPI)
}

export const DOWNLOAD_FILE = async (data, thunkAPI) => {
  return await request({
    method: 'post',
    ...data,
    action: ACTIONS_DOWNLOAD_FILE,
  }, thunkAPI)
}