import {Box, Button, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {tokens} from "../../../theme";
import * as Apis from "../../../apis";
import {useNavigate} from "react-router-dom";
import * as utils from "../../../utils/util";
import {Helmet} from "react-helmet-async";
import { Formik, Form, Field } from "formik";
import {CheckboxWithLabel, TextField} from "formik-mui";
import * as Yup from "yup";
import {makeSnackbarMessage, VALIDATION_SCHEMA} from "../../../utils/const";

const Join = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const [params, setParams] = useState({})
  const [validLoginId, setValidLoginId] = useState({
    isValid: false,
    helperText: ''
  })
  const [validPassword, setValidPassword] = useState({
    isValid: false,
    helperText: ''
  })
  const [equalPassword, setEqualPassword] = useState({
    isEqual: false,
    helperText: ''
  })

  const handleChange = (e) => {
    setParams({...params, [e.target.name]: e.target.value})
  }

  const validateLoginId = (e) => {
    const loginId = e.target.value
    /*
     * validate id
     * 1. 영어/숫자만
     * 2. 3~20자리
     */
    if (loginId === '') {
      setValidLoginId({
        isValid: false,
        helperText: ''
      })
    } else {
      if (loginId.search(/[^0-9a-zA-Z]/g) !== -1) {
        setValidLoginId({
          isValid: false,
          helperText: '영어/숫자만 입력하세요.'
        })
      } else if (loginId.length < 3 || loginId.length > 20) {
        setValidLoginId({
          isValid: false,
          helperText: '3 ~ 20자리로 입력해주세요.'
        })
      } else {
        setValidLoginId({
          isValid: true,
          helperText: ''
        })
      }
    }
    setParams({...params, [e.target.name]: e.target.value})
  }

  const validatePassword = (e) => {
    setParams({...params, [e.target.name]: e.target.value})
    utils.validatePw({ password: e.target.value, setValidPassword })

    const password = e.target.value
    const checkPassword = params['repeatPw']
    utils.checkEqualPw({password, checkPassword, setEqualPassword})
  }

  const checkEqualPassword = (e) => {
    setParams({...params, [e.target.name]: e.target.value})
    const password = params['loginPw']
    const checkPassword = e.target.value
    utils.checkEqualPw({password, checkPassword, setEqualPassword})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!(validPassword.isValid && equalPassword.isEqual)) {
      alert("비밀번호를 확인해주세요.")
      return false;
    }
    try {
      const response = await Apis.auth.join(params)
      if (response.code === 200) {
        alert(response.message)
        navigate("/login", {replace: true})
      }
    } catch (e) {
      console.log(e)
      alert(e.response.data.message)
    }
  }

  const initialValues = {
    loginId: '',
    loginPw: '',
    confirmLoginPw: '',
    adminNm: '',
    email: '',
    mobileNo: '',
  }

  const validationSchema = Yup.object().shape({
    loginId: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .matches(VALIDATION_SCHEMA.LOGIN_ID.MATCHES.regex, VALIDATION_SCHEMA.LOGIN_ID.MATCHES.message),
    loginPw: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .matches(VALIDATION_SCHEMA.LOGIN_PW.MATCHES.regex, VALIDATION_SCHEMA.LOGIN_PW.MATCHES.message),
    confirmLoginPw: Yup.string().oneOf([Yup.ref('loginPw'), null], VALIDATION_SCHEMA.COMMON.confirmPasswordMessage),
    adminNm: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .max(VALIDATION_SCHEMA.ADMIN_NM.MAX.length, VALIDATION_SCHEMA.ADMIN_NM.MAX.message),
    email: Yup.string().email().required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    mobileNo: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .matches(VALIDATION_SCHEMA.MOBILE_NO.MATCHES.regex, VALIDATION_SCHEMA.MOBILE_NO.MATCHES.message)
  })

  return (
    <>
      <Helmet title='Join' />
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        width="20%"
        height="100vh"
        m="10px auto"
      >
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          mb={3}
        >
          회원가입
        </Typography>
        <Box component="form" width="100%" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            fullWidth
            id="loginId"
            name="loginId"
            variant="outlined"
            color="info"
            label="아이디"
            margin="normal"
            error={!validLoginId.isValid && validLoginId.helperText !== ''}
            helperText={validLoginId.helperText}
            onChange={validateLoginId}
          />
          <TextField
            required
            fullWidth
            type="password"
            id="loginPw"
            name="loginPw"
            variant="outlined"
            color="info"
            label="비밀번호"
            margin="normal"
            error={!validPassword.isValid && validPassword.helperText !== ''}
            helperText={validPassword.helperText}
            onChange={validatePassword}
          />
          <TextField
            required
            fullWidth
            type="password"
            id="repeatPw"
            name="repeatPw"
            variant="outlined"
            color="info"
            label="비밀번호 확인"
            margin="normal"
            error={!equalPassword.isEqual && equalPassword.helperText !== ''}
            helperText={equalPassword.helperText}
            onChange={checkEqualPassword}
          />
          <TextField
            required
            fullWidth
            id="adminNm"
            name="adminNm"
            variant="outlined"
            color="info"
            label="이름"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            variant="outlined"
            color="info"
            label="이메일"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="mobileNo"
            name="mobileNo"
            variant="outlined"
            color="info"
            label="휴대폰 번호"
            margin="normal"
            onChange={handleChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            color="success"
            sx={{ mt: 3 }}
          >
            회원가입
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Join