import axios, {AxiosError} from "axios";

const request = async (data, thunkAPI) => {
  return await axios({
    method: data.method,
    baseURL: process.env.REACT_APP_BASE_URL,
    url: data.url,
    ...(data.headers && {headers: data.headers}),
    [data.method === 'get' ? 'params' : 'data']: data.params,
  }, thunkAPI)
    .then(res => res.data)
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