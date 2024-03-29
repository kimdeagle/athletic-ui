import {Box, Button, Typography} from "@mui/material";
import * as Apis from "../../../apis";
import {Helmet} from "react-helmet-async";
import {useSnackbar} from "notistack";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import {STATUS_SUCCESS, VALIDATION_SCHEMA} from "../../../utils/const";
import {makeSnackbarMessage} from "../../../utils/util";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";

const ResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar()

  const initialValues = {
    loginId: '',
    email: '',
  }

  const validationSchema = Yup.object().shape({
    loginId: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    email: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .matches(VALIDATION_SCHEMA.EMAIL.MATCHES.regex, VALIDATION_SCHEMA.EMAIL.MATCHES.message)
  })

  const handleSubmit = async (values) => {
    const { status, message } = await Apis.auth.resetPassword(values)
    if (status === STATUS_SUCCESS) {
      enqueueSnackbar(makeSnackbarMessage(message), {
        variant: 'success',
        onClose: () => window.location.replace(ROUTE_PATH_NAME.login),
      })
    } else {
      enqueueSnackbar(message, { variant: 'error' })
    }
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
          fontWeight="bold"
          mb={3}
        >
          비밀번호 초기화
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
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
                type='text'
                fullWidth
                id='email'
                name='email'
                label='이메일 *'
                color='primary'
                variant='outlined'
                margin='normal'
              />
              <Button
                fullWidth
                variant='contained'
                type='submit'
                size='large'
                color='warning'
                sx={{ mt: 3 }}
                disabled={isSubmitting}
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