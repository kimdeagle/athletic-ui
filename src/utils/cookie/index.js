import { Cookies } from "react-cookie";
import {format} from "date-fns";

const cookies = new Cookies()
const REMEMBER_ID_COOKIE_NAME = "remember_id"
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
 * 2. login timestamp cookie
 */
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

export const removeLoginAt = () => {
  cookies.remove(LOGIN_AT_COOKIE_NAME)
}