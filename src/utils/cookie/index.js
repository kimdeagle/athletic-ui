import { Cookies } from "react-cookie";
import {format} from "date-fns";

const cookies = new Cookies()
const REMEMBER_ID_COOKIE_NAME = "remember_id"
const REFRESH_TOKEN_COOKIE_NAME = "refresh_token"
const LOGIN_AT_COOKIE_NAME = "login_at"

/**
 * 1. remember id cookie
 */
export const getRememberId = () => {
  return cookies.get(REMEMBER_ID_COOKIE_NAME)
}

export const setRememberId = (loginId) => {
  const now = new Date()
  const expires = new Date().setFullYear(now.getFullYear() + 1)
  cookies.set(REMEMBER_ID_COOKIE_NAME, loginId, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expires)
  })
}

export const removeRememberId = () => {
  cookies.remove(REMEMBER_ID_COOKIE_NAME)
}

/**
 * 2. refresh token
 */
export const getRefreshToken = () => {
  return cookies.get(REFRESH_TOKEN_COOKIE_NAME)
}

export const setRefreshToken = (token) => {
  cookies.set(REFRESH_TOKEN_COOKIE_NAME, token.refreshToken, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(token.refreshTokenExpiresIn)
  })
}

export const removeRefreshToken = () => {
  cookies.remove(REFRESH_TOKEN_COOKIE_NAME)
}

export const getLoginAt = () => {
  return cookies.get(LOGIN_AT_COOKIE_NAME)
}

export const setLoginAt = () => {
  const now = new Date()
  const expires = new Date().setFullYear(now.getFullYear() + 1)
  cookies.set(LOGIN_AT_COOKIE_NAME, format(new Date(), 'yyyy-MM-dd HH:mm:ss'), {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expires)
  })
}