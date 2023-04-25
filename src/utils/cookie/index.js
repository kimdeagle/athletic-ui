import { Cookies } from "react-cookie";

const cookies = new Cookies()
const REMEMBER_ID_COOKIE_NAME = "rememberId"
const REFRESH_TOKEN_COOKIE_NAME = "refresh_token"

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