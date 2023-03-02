
/* authorization header name */
export const AUTHORIZATION_HEADER_NAME = 'Authorization'

/* bearer prefix */
export const BEARER_PREFIX = 'Bearer '

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

/* common button attributes */
export const BUTTONS_EXCEL_UPLOAD = 'excelUpload'
export const BUTTONS_EXCEL_DOWNLOAD = 'excelDownload'
export const BUTTONS_ADD = 'add'
export const BUTTONS_SEARCH = 'search'
export const BUTTONS_EDIT = 'edit'
export const BUTTON_PROPS_DISABLED = 'disabled'
export const BUTTON_PROPS_ON_CLICK = 'onClick'

/* data grid cell class name */
export const DATA_GRID_CELL_CLASS_NAME = {
  GREEN_COLOR: 'green-color--cell',
  CURSOR_POINTER: 'hover-cursor-pointer--cell'
}

/* address api url */
export const DAUM_POSTCODE_SCRIPT_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

/* validation schema */
export const VALIDATION_SCHEMA = {
  COMMON: {
    requiredMessage: '필수 입력 항목입니다.',
    emailMessage: '이메일 형식이 아닙니다.',
    confirmPasswordMessage: '비밀번호 불일치',
  },
  LOGIN_ID: {
    MATCHES: {
      regex: /^[a-z0-9]{3,15}$/gi,
      message: '3 ~ 15글자 이하의 영어 또는 숫자만 입력하세요.',
    },
  },
  LOGIN_PW: {
    MATCHES: {
      regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[~!@#$%^&*()_+])[a-z0-9~!@#$%^&*()_+]{8,20}$/gi,
      message: '8 ~ 20글자 이하의 영어/숫자/특수문자를 조합해서 입력하세요.',
    }
  },
  ADMIN_NM: {
    MAX: {
      length: 10,
      message: '10글자 이하로 입력하세요.',
    }
  },
  MEMBER_NM: {
    MAX: {
      length: 10,
      message: '10글자 이하로 입력하세요.',
    }
  },
  MOBILE_NO: {
    MATCHES: {
      regex: /^01[016789]-?[0-9]{3,4}-?[0-9]{4}$/g,
      message: '올바르지 않은 휴대폰 번호입니다.',
    }
  },
  BIRTHDAY: {
    MATCHES: {
      regex: /^(19[0-9][0-9]|20\d{2})-?(0[0-9]|1[0-2])-?(0[1-9]|[1-2][0-9]|3[0-1])$/g,
      message: '올바른 8자리 생년월일을 입력해주세요.',
    }
  },
  JOIN_DT: {
    MATCHES: {
      regex: /^(19[0-9][0-9]|20\d{2})-?(0[0-9]|1[0-2])-?(0[1-9]|[1-2][0-9]|3[0-1])$/g,
      message: '올바른 8자리 입회일자를 입력해주세요.',
    }
  },
}

/* default auto hide duration ms */
export const DEFAULT_AUTO_HIDE_DURATION_MS = 2000

/* default sleep ms */
export const DEFAULT_SLEEP_MS = 2000