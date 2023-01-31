import axios from "axios";

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

export const get = async (params, thunkAPI) => {
  return await request({
    method: 'get',
    ...params
  }, thunkAPI)
}

export const post = async (params, thunkAPI) => {
  return await request({
    method: 'post',
    ...params
  }, thunkAPI)
}