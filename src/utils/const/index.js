
/* success status */
export const STATUS_SUCCESS = 200

/* authorization header name */
export const AUTHORIZATION_HEADER_NAME = 'Authorization'

/* bearer prefix */
export const BEARER_PREFIX = 'Bearer '

/* 비로그인 접근 url */
export const IS_NOT_AUTHENTICATED_PATH_LIST = ['/login', '/join', '/reset-password']

/* auth interval timeout */
export const AUTH_INTERVAL_TIMEOUT = 1000

/* re issue access token interval timeout (30 min) */
export const RE_ISSUE_ACCESS_TOKEN_INTERVAL_TIMEOUT = 1000 * 60 * 30;

/* common button attributes */
export const BUTTONS_EXCEL_UPLOAD = 'excelUpload'
export const BUTTONS_EXCEL_DOWNLOAD = 'excelDownload'
export const BUTTONS_EXCEL_DOWNLOAD_SEARCH_CONDITION = 'excelDownloadSearchCondition'
export const BUTTONS_ADD = 'add'
export const BUTTONS_SEARCH = 'search'
export const BUTTONS_EDIT = 'edit'
export const BUTTON_PROPS_DISABLED = 'disabled'
export const BUTTON_PROPS_PARAMETERS = 'params'
export const BUTTON_PROPS_ON_CLICK = 'onClick'
export const SEARCH_CONDITION_PERIOD = 'period'
export const SEARCH_CONDITION_IN_OUT_CD = 'inOutCd'
export const SEARCH_CONDITION_IN_OUT_DTL_CD = 'inOutDtlCd'

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
    requiredSelectedMessage: '필수 선택 항목입니다.',
    confirmPasswordMessage: '비밀번호 불일치',
    fileRequiredMessage: '파일을 선택해주세요.',
    numberTypeErrorMessage: '숫자만 입력하세요.',
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
  NAME: {
    MAX: {
      length: 10,
      message: '10글자 이하로 입력하세요.',
    }
  },
  MOBILE_NO: {
    MATCHES: {
      regex: /^01[016789]-?[0-9]{3,4}-?[0-9]{4}$/g,
      message: '올바른 휴대폰 번호를 입력하세요.',
    }
  },
  BIRTHDAY: {
    MATCHES: {
      regex: /^(19[0-9][0-9]|20\d{2})-?(0[0-9]|1[0-2])-?(0[1-9]|[1-2][0-9]|3[0-1])$/g,
      message: '올바른 8자리 생년월일을 입력하세요.',
    }
  },
  JOIN_DT: {
    MATCHES: {
      regex: /^(19[0-9][0-9]|20\d{2})-?(0[0-9]|1[0-2])-?(0[1-9]|[1-2][0-9]|3[0-1])$/g,
      message: '올바른 8자리 입회일자를 입력하세요.',
    }
  },
  EMAIL: {
    MATCHES: {
      regex: /^[a-zA-Z0-9+\-\\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g,
      message: '올바른 이메일을 입력하세요.',
    }
  },
  SORT_SEQ: {
    MIN: {
      limit: 0,
      message: '0보다 작을 수 없습니다.'
    },
    MAX: {
      limit: 999,
      message: '999보다 클 수 없습니다.'
    }
  },
  END_DT: {
    MinMessage: '종료일자는 시작일자보다 작을 수 없습니다.',
  },
  AUTHORITY_NAME: {
    MATCHES: {
      regex: /^ROLE_[A-Z]+$/g,
      message: '올바른 권한명을 입력하세요. (ex. ROLE_ABC)'
    }
  }
}

/* default auto hide duration ms */
export const DEFAULT_AUTO_HIDE_DURATION_MS = 2000

/* default sleep ms */
export const DEFAULT_SLEEP_MS = 2000

export const NEW_MENU = {
  id: 'new',
  name: '새 메뉴',
  upMenuId: '',
  upMenuName: '',
  menuUrl: '/new',
  menuLevel: 0,
  useYn: 'N',
  sortSeq: 999,
  iconNm: '',
  children: [],
  regId: '',
  regDt: '',
  modId: '',
  modDt: '',
  authorities: []
}

export const ROOT_MENU = {...NEW_MENU, id: 'root', name: 'root', menuUrl: ''}


export const COMMON_CODE = {
  APPROVE_STATUS: 'APPROVE_STATUS',
  DUES: {
    IN: 'IN',
    OUT: 'OUT',
    REST: 'REST',
  },
  BG_COLOR: 'BG_COLOR',
}

export const MARGIN_NORMAL = {
  mt: '16px',
  mb: '8px'
}