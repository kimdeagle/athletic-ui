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
import {makeSnackbarMessage, VALIDATION_SCHEMA} from "../../../utils/const";

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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = await Apis.auth.login(values)
      const {accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn} = token

      dispatch(setAccessToken({accessToken, accessTokenExpiresIn}))
      setRefreshToken({refreshToken, refreshTokenExpiresIn})
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      const user = jwtDecode(accessToken)
      setUser({user, expires: refreshTokenExpiresIn})
      dispatch(getMenuList())

      if (values.isRemember) {
        setRememberId(values.loginId)
      } else {
        removeRememberId()
      }
      navigate('/', {replace: true})

    } catch (e) {
      console.log(e)
      enqueueSnackbar(makeSnackbarMessage(e.response.data.message), { variant: 'error' })
    } finally {
      setTimeout(() => setSubmitting(false), 500)
    }
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
          color={colors.grey[100]}
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
                color='info'
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
                color='info'
                variant='outlined'
                margin='normal'
              />
              <Field
                component={CheckboxWithLabel}
                type='checkbox'
                id='isRemember'
                name='isRemember'
                Label={{ label: '아이디 저장' }}
                color='info'
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="info"
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
            onClick={() => navigate("/reset-password")}
          >
            비밀번호 초기화
          </Link>
          <Link
            component="button"
            variant="body1"
            underline="hover"
            color={colors.grey[100]}
            onClick={() => navigate("/join")}
          >
            회원가입
          </Link>
        </Box>
      </Box>
    </>
  )
}

export default Login