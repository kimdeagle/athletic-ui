
/* 로그인 접근 url */
export const IS_AUTHENTICATED_PATH_LIST = ['/']

/* 비로그인 접근 url */
export const IS_NOT_AUTHENTICATED_PATH_LIST = ['/login', '/join', '/reset-password']

/* auth interval timeout */
export const AUTH_INTERVAL_TIMEOUT = 1000

/* re issue access token interval timeout (30 min) */
export const RE_ISSUE_ACCESS_TOKEN_INTERVAL_TIMEOUT = 1000 * 60 * 30;

/* role prefix */
export const ROLE_PREFIX = "ROLE_"

/* hide button pathname list */
export const HIDE_BUTTON_PATHNAME_LIST = ['/', '/my', '/system']