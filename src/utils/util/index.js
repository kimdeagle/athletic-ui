import {format} from "date-fns";

export const isBlank = (value) => {
  if (typeof value === 'object')
    return !value || Object.keys(value).length === 0
  else
    return !value
}

export const isNotBlank = (value) => {
  return !isBlank(value)
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

export const convertMobileNo = (mobileNo) => {
  /**
   * convert 01012345678 to 010-1234-5678
   */
  return isBlank(mobileNo) ? mobileNo : mobileNo.substring(0, 3) + '-' + mobileNo.substring(3, 7) + '-' + mobileNo.substring(7)
}

export const getAgeFromBirthday = (birthday) => {
  return isBlank(birthday) ? birthday : String(Math.floor((parseInt(format(new Date(), 'yyyyMMdd')) - parseInt(birthday)) / 10000))
}

export const generateGridIdByNumber = (list) => {
  list.forEach((item, index) => item.id = index+1)
  return list
}

export const StringToDateHyphen = (date) => {
  return isBlank(date) ? date : date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6)
}

export const replaceOnlyNumber = (value) => {
  return value.replaceAll(/[^0-9]/g, '')
}