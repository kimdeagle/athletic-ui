
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

export const BUTTONS_EXCEL_UPLOAD = 'excelUpload'
export const BUTTONS_EXCEL_DOWNLOAD = 'excelDownload'
export const BUTTONS_ADD = 'add'
export const BUTTONS_SEARCH = 'search'
export const BUTTON_PROPS_DISABLED = 'disabled'
export const BUTTON_PROPS_ON_CLICK = 'onClick'

export const DATA_GRID_CELL_CLASS_NAME = {
  GREEN_COLOR: 'green-color--cell',
  CURSOR_POINTER: 'hover-cursor-pointer--cell'
}