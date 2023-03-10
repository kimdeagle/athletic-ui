import {Box, Button, Typography} from "@mui/material";
import * as Apis from "../../../apis";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import { Formik, Form, Field } from "formik";
import {TextField} from "formik-mui";
import * as Yup from "yup";
import {DEFAULT_SLEEP_MS, VALIDATION_SCHEMA} from "../../../utils/const";
import {useSnackbar} from "notistack";
import {makeSnackbarMessage, sleep} from "../../../utils/util";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";

const Join = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

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
    email: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .matches(VALIDATION_SCHEMA.EMAIL.MATCHES.regex, VALIDATION_SCHEMA.EMAIL.MATCHES.message),
    mobileNo: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .matches(VALIDATION_SCHEMA.MOBILE_NO.MATCHES.regex, VALIDATION_SCHEMA.MOBILE_NO.MATCHES.message)
  })

  const handleSubmit = async (values) => {
    try {
      const response = await Apis.auth.join(values)
      if (response.code === 200) {
        enqueueSnackbar(makeSnackbarMessage(response.message), {
          variant: 'success',
          onClose: () => navigate(ROUTE_PATH_NAME.login, { replace: true }),
        })
      }
    } catch (e) {
      enqueueSnackbar(makeSnackbarMessage(e.response.data.message), { variant: 'error' })
    }
    await sleep(DEFAULT_SLEEP_MS)
  }

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
          fontWeight="bold"
          mb={3}
        >
          ????????????
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
                label='?????????'
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
                label='????????????'
                color='primary'
                variant='outlined'
                margin='normal'
              />
              <Field
                component={TextField}
                type='password'
                fullWidth
                required
                id='confirmLoginPw'
                name='confirmLoginPw'
                label='???????????? ??????'
                color='primary'
                variant='outlined'
                margin='normal'
              />
              <Field
                component={TextField}
                type='text'
                fullWidth
                required
                id='adminNm'
                name='adminNm'
                label='??????'
                color='primary'
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
                label='?????????'
                color='primary'
                variant='outlined'
                margin='normal'
              />
              <Field
                component={TextField}
                type='text'
                fullWidth
                required
                id='mobileNo'
                name='mobileNo'
                label='????????? ??????'
                color='primary'
                variant='outlined'
                margin='normal'
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="success"
                sx={{ mt: 3 }}
                disabled={isSubmitting}
                onClick={submitForm}
              >
                ????????????
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}

export default Join