
/* 로그인 접근 url */
export const IS_AUTHENTICATED_PATH_LIST = ['/']

/* 비로그인 접근 url */
export const IS_NOT_AUTHENTICATED_PATH_LIST = ['/login', '/join', '/reset-password']

/* auth interval timeout */
export const AUTH_INTERVAL_TIMEOUT = 1000

/* re issue access token interval timeout */
export const RE_ISSUE_ACCESS_TOKEN_INTERVAL_TIMEOUT = 1000 * 10

/* role prefix */
export const ROLE_PREFIX = "ROLE_"