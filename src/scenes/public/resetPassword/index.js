import {Box, Button, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import * as Apis from "../../../apis";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {useSnackbar} from "notistack";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import {DEFAULT_SLEEP_MS, VALIDATION_SCHEMA} from "../../../utils/const";
import {makeSnackbarMessage, sleep} from "../../../utils/util";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";

const ResetPassword = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { enqueueSnackbar } = useSnackbar()

  const initialValues = {
    loginId: '',
    email: '',
  }

  const validationSchema = Yup.object().shape({
    loginId: Yup.string().required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    email: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .email(VALIDATION_SCHEMA.COMMON.emailMessage),
  })

  const handleSubmit = async (values) => {
    try {
      const response = await Apis.auth.resetPassword(values)
      if (response.code === 200) {
        enqueueSnackbar(makeSnackbarMessage(response.message), {
          variant: 'success',
          onClose: () => navigate(ROUTE_PATH_NAME.login, { replace: true }),
        })
      }
    } catch (e) {
      console.log(e)
      enqueueSnackbar(e.response.data.message || '알 수 없는 오류', {
        variant: 'error',
      })
    }
    await sleep(DEFAULT_SLEEP_MS)
  }

  return (
    <>
      <Helmet title='Reset Password' />
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
          비밀번호 초기화
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ submitForm, isSubmitting }) => (
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
                type='text'
                fullWidth
                required
                id='email'
                name='email'
                label='이메일'
                color='info'
                variant='outlined'
                margin='normal'
              />
              <Button
                fullWidth
                variant='contained'
                size='large'
                color='warning'
                sx={{ mt: 3 }}
                disabled={isSubmitting}
                onClick={submitForm}
              >
                비밀번호 초기화
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}

export default ResetPassword