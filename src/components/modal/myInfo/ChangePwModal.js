import {Button} from "@mui/material";
import * as Apis from "../../../apis";
import CustomModal from "../index";
import {makeSnackbarMessage, sleep} from "../../../utils/util";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import {useSnackbar} from "notistack";
import * as Yup from "yup";
import {DEFAULT_SLEEP_MS, VALIDATION_SCHEMA} from "../../../utils/const";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";

const ChangePwModal = ({open, setOpen}) => {
  const { enqueueSnackbar } = useSnackbar()

  const handleClose = () => {
    setOpen(false)
  }

  const initialValues = {
    loginPw: '',
    changePw: '',
    confirmChangePw: '',
  }

  const validationSchema = Yup.object().shape({
    loginPw: Yup.string().required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    changePw: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .matches(VALIDATION_SCHEMA.LOGIN_PW.MATCHES.regex, VALIDATION_SCHEMA.LOGIN_PW.MATCHES.message),
    confirmChangePw: Yup.string().oneOf([Yup.ref('changePw'), null], VALIDATION_SCHEMA.COMMON.confirmPasswordMessage)
  })

  const handleSubmit = async (values) => {
    try {
      //기존 비밀번호와 동일한지 체크
      const response = await Apis.admin.changePassword(values)
      if (response.code === 200) {
        enqueueSnackbar(makeSnackbarMessage(response.message), {
          variant: 'success',
          onExit: () => window.location.replace(ROUTE_PATH_NAME.myInfo),
        })
      }
    } catch (e) {
      enqueueSnackbar(makeSnackbarMessage(e.response.data.message), { variant: 'error' })
    }
    await sleep(DEFAULT_SLEEP_MS)
  }

  return (
    <CustomModal width='500' title='비밀번호 변경' open={open} handleClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({submitForm, isSubmitting}) => (
          <Form>
            <Field
              component={TextField}
              type='password'
              autoFocus={open}
              fullWidth
              required
              id='loginPw'
              name='loginPw'
              label='현재 비밀번호'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Field
              component={TextField}
              type='password'
              fullWidth
              required
              id='changePw'
              name='changePw'
              label='변경 비밀번호'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Field
              component={TextField}
              type='password'
              fullWidth
              required
              id='confirmChangePw'
              name='confirmChangePw'
              label='변경 비밀번호 확인'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Button
              fullWidth
              variant='contained'
              size='large'
              color='primary'
              sx={{ mt: 3 }}
              disabled={isSubmitting}
              onClick={submitForm}
            >
              비밀번호 변경
            </Button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default ChangePwModal