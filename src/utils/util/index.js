import {addDays, format, subDays} from "date-fns";

export const isBlank = (value) => {
  if (typeof value === 'object')
    return !value || Object.keys(value).length === 0
  else
    return !value
}

export const isNotBlank = (value) => {
  return !isBlank(value)
}

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const validatePw = ({ password, setValidPassword }) => {
  /*
   * validate password
   * 1. 8~20자리
   * 2. 공백X
   * 3. 특수문자 1개 이상
   * 4. 영문 1개 이상
   */
  if (isBlank(password)) {
    setValidPassword({
      isValid: false,
      helperText: ''
    })
  } else {
    if (password.length < 8 || password.length > 20) {
      setValidPassword({
        isValid: false,
        helperText: '8 ~ 20자리로 입력해주세요.'
      })
    } else if (password.search(/\s/g) !== -1) {
      setValidPassword({
        isValid: false,
        helperText: '공백없이 입력해주세요.'
      })
    } else if (password.search(/[~!@#$%^&*()_+]/g) === -1) {
      setValidPassword({
        isValid: false,
        helperText: '특수문자 1개 이상 입력해주세요.'
      })
    } else if (password.search(/[a-zA-z]/g) === -1) {
      setValidPassword({
        isValid: false,
        helperText: '영문 1개 이상 입력해주세요.'
      })
    } else {
      setValidPassword({
        isValid: true,
        helperText: ''
      })
    }
  }
}

export const checkEqualPw = ({ password, checkPassword, setEqualPassword }) => {
  //check equal password
  if (isBlank(checkPassword)) {
    setEqualPassword({
      isEqual: false,
      helperText: ''
    })
  } else if (password === checkPassword) {
    setEqualPassword({
      isEqual: true,
      helperText: '일치'
    })
  } else if (password !== checkPassword) {
    setEqualPassword({
      isEqual: false,
      helperText: '불일치'
    })
  }
}

export const getAgeFromBirthday = (birthday) => {
  return isBlank(birthday) ? birthday : String(Math.floor((parseInt(format(new Date(), 'yyyyMMdd')) - parseInt(birthday.replaceAll(/[^0-9]/g, ''))) / 10000))
}

export const replaceOnlyNumber = (value) => {
  return value.replaceAll(/[^0-9]/g, '')
}

/* make snackbar message element */
export const makeSnackbarMessage = (msg) => {
  /* 줄바꿈 변경하여 리턴 */
  const message = msg.replaceAll('\n', '<br/>')
  return (
    <div dangerouslySetInnerHTML={{__html: message}}/>
  )
}

export const processMenu = (menus) => {
  return menus.map(menu => {
    const copyMenu = {...menu}
    const children = menus.filter(m => copyMenu.id === m.upMenuId)
    if (children.length)
      copyMenu.children = processMenu(children)
    else
      copyMenu.children = []
    return copyMenu
  }).sort((a, b) => a.sortSeq - b.sortSeq === 0 ? parseInt(a.id) - parseInt(b.id) : a.sortSeq - b.sortSeq)
}

export const getProcessedMenuList = (menus) => {
  return processMenu(menus).filter(menu => menu.upMenuId === null)
}

export const isEmptyObject = (obj) => {
  return obj === null || obj === undefined || Object.keys(obj).length === 0
}

export const getStringDate = (date) => {
  return format(new Date(date), 'yyyy-MM-dd')
}

export const getStringDateTime = (date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss')
}

export const getStringDateAddOneDays = (date) => {
  return getStringDate(addDays(new Date(date), 1))
}

export const getDateSubOneDays = (date) => {
  return subDays(date, 1)
}

export const isMinEndDt = (values) => {
  const { startDt, endDt } = values
  return format(startDt, 'yyyyMMdd') > format(endDt, 'yyyyMMdd')
}

export const clearAllInterval = async () => {
  for (let i=0; i<=window.authInterval; i++) {
    clearInterval(i)
  }
}