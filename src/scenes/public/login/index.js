import {tokens} from "../../../theme";
import {
  Box,
  Button,
  Link,
  Typography,
  useTheme
} from "@mui/material";
import {getRememberId, removeRememberId, setRefreshToken, setRememberId, setUser} from "../../../utils/cookie";
import {useNavigate} from "react-router-dom";
import * as Apis from "../../../apis";
import {setAccessToken} from "../../../redux/auth";
import jwtDecode from "jwt-decode";
import {getMenuList} from "../../../redux/menu";
import {useDispatch} from "react-redux";
import axios from "axios";
import {Helmet} from "react-helmet-async";
import {useSnackbar} from "notistack";
import { Formik, Form, Field } from "formik";
import {CheckboxWithLabel, TextField} from "formik-mui";
import * as Yup from "yup";
import {
  AUTHORIZATION_HEADER_NAME, BEARER_PREFIX,
  DEFAULT_SLEEP_MS,
  VALIDATION_SCHEMA
} from "../../../utils/const";
import {makeSnackbarMessage, sleep} from "../../../utils/util";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";

const Login = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const initialValues = {
    loginId: getRememberId() || '',
    loginPw: '',
    isRemember: !!getRememberId(),
  }

  const validationSchema = Yup.object().shape({
    loginId: Yup.string().required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    loginPw: Yup.string().required(VALIDATION_SCHEMA.COMMON.requiredMessage)
  })

  const handleSubmit = async (values) => {
    try {
      const token = await Apis.auth.login(values)
      const {accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn} = token

      dispatch(setAccessToken({accessToken, accessTokenExpiresIn}))
      setRefreshToken({refreshToken, refreshTokenExpiresIn})
      axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = BEARER_PREFIX + accessToken
      const user = jwtDecode(accessToken)
      setUser({user, expires: refreshTokenExpiresIn})
      dispatch(getMenuList())

      if (values.isRemember) {
        setRememberId(values.loginId)
      } else {
        removeRememberId()
      }
      navigate(ROUTE_PATH_NAME.home, {replace: true})

    } catch (e) {
      enqueueSnackbar(makeSnackbarMessage(e.response.data.message), { variant: 'error' })
    }
    await sleep(DEFAULT_SLEEP_MS)
  }

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
          {({submitForm, isSubmitting}) => (
            <Form>
              <Field
                component={TextField}
                type='text'
                autoFocus
                fullWidth
                required
                id='loginId'
                name='loginId'
                label='아이디'
                color='primary'
                variant='outlined'
                margin='normal'
              />
              <Field
                component={TextField}
                type='password'
                fullWidth
                required
                id='loginPw'
                name='loginPw'
                label='비밀번호'
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
                size="large"
                color='primary'
                sx={{ mt: 3 }}
                disabled={isSubmitting}
                onClick={submitForm}
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