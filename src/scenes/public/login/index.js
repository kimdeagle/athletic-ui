import {tokens} from "../../../theme";
import {
  Box,
  Button,
  Link,
  Typography,
  useTheme
} from "@mui/material";
import {getRememberId} from "../../../utils/cookie";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import { Formik, Form, Field } from "formik";
import {CheckboxWithLabel, TextField} from "formik-mui";
import * as Yup from "yup";
import {
  VALIDATION_SCHEMA
} from "../../../utils/const";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";

const Login = ({handleLogin}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()

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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
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