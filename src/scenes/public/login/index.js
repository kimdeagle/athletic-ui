import {tokens} from "../../../theme";
import {
  Box,
  Button,
  Link,
  Typography,
  useTheme
} from "@mui/material";
import {getRememberId, removeRememberId, setRefreshToken, setRememberId} from "../../../utils/cookie";
import {useNavigate} from "react-router-dom";
import * as Apis from "../../../apis";
import {setAccessToken} from "../../../redux/auth";
import {getUseMenuList} from "../../../redux/system/menu";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Helmet} from "react-helmet-async";
import {useSnackbar} from "notistack";
import { Formik, Form, Field } from "formik";
import {CheckboxWithLabel, TextField} from "formik-mui";
import * as Yup from "yup";
import {
  AUTHORIZATION_HEADER_NAME, BEARER_PREFIX,
  STATUS_SUCCESS,
  VALIDATION_SCHEMA
} from "../../../utils/const";
import {makeSnackbarMessage} from "../../../utils/util";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";
import {getUser, setLoginAt} from "../../../redux/user";
import {useEffect} from "react";
import {format} from "date-fns";

const Login = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const authenticated = useSelector(state => state.auth.authenticated)

  const initialValues = {
    loginId: getRememberId() || '',
    loginPw: '',
    isRemember: !!getRememberId(),
  }

  const validationSchema = Yup.object().shape({
    loginId: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    loginPw: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
  })

  const handleSubmit = async (values) => {
    const { status, message, data:token } = await Apis.auth.login(values)
    if (status === STATUS_SUCCESS) {
      //get token data
      const {accessToken, refreshToken, refreshTokenExpiresIn} = token
      //set authorization of axios header
      axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = BEARER_PREFIX + accessToken
      //set rememberId
      values.isRemember ? setRememberId(values.loginId) : removeRememberId()
      //set user
      dispatch(getUser())
      //set login time
      dispatch(setLoginAt(format(new Date(), 'yyyy-MM-dd HH:mm:ss')))
      //set use menu list
      dispatch(getUseMenuList())
      //set refresh token
      setRefreshToken({refreshToken, refreshTokenExpiresIn})
      //set accessToken
      dispatch(setAccessToken(accessToken))
    } else {
      enqueueSnackbar(makeSnackbarMessage(message), { variant: 'error' })
    }
  }

  useEffect(() => {
    //로그인 성공 시 메인으로 이동
    if (authenticated) {
      window.location.replace(ROUTE_PATH_NAME.home)
    }
  }, [authenticated])

  return (
    <>
      <Helmet title='Login' />
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
          fontWeight="bold"
          mb={3}
        >
          LOGIN
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({isSubmitting}) => (
            <Form>
              <Field
                component={TextField}
                type='text'
                autoFocus
                fullWidth
                id='loginId'
                name='loginId'
                label='아이디 *'
                color='primary'
                variant='outlined'
                margin='normal'
              />
              <Field
                component={TextField}
                type='password'
                fullWidth
                id='loginPw'
                name='loginPw'
                label='비밀번호 *'
                color='primary'
                variant='outlined'
                margin='normal'
              />
              <Field
                component={CheckboxWithLabel}
                type='checkbox'
                id='isRemember'
                name='isRemember'
                Label={{ label: '아이디 저장' }}
                color='primary'
              />
              <Button
                fullWidth
                variant="contained"
                type='submit'
                size="large"
                color='primary'
                sx={{ mt: 3 }}
                disabled={isSubmitting}
              >
                LOGIN
              </Button>
            </Form>
          )}
        </Formik>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          mt={1}
        >
          <Link
            component="button"
            variant="body1"
            underline="hover"
            color={colors.grey[100]}
            onClick={() => navigate(ROUTE_PATH_NAME.resetPassword)}
          >
            비밀번호 초기화
          </Link>
          <Link
            component="button"
            variant="body1"
            underline="hover"
            color={colors.grey[100]}
            onClick={() => navigate(ROUTE_PATH_NAME.join)}
          >
            계정생성
          </Link>
        </Box>
      </Box>
    </>
  )
}

export default Login