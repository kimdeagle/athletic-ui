import {Button} from "@mui/material";
import * as Apis from "../../../apis";
import CustomModal from "../index";
import {
  AUTHORIZATION_HEADER_NAME,
  DEFAULT_SLEEP_MS, STATUS_SUCCESS,
  VALIDATION_SCHEMA
} from "../../../utils/const";
import {useSnackbar} from "notistack";
import {resetAccessToken} from "../../../redux/auth";
import {removeRefreshToken, removeRememberId, removeUser} from "../../../utils/cookie";
import {resetMenuState} from "../../../redux/system/menu";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import {makeSnackbarMessage, sleep} from "../../../utils/util";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";

const OutModal = ({open, setOpen}) => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
  }

  const initialValues = {
    loginPw: ''
  }

  const validationSchema = Yup.object().shape({
    loginPw: Yup.string().required(VALIDATION_SCHEMA.COMMON.requiredMessage)
  })

  const outProcess = () => {
    handleClose()
    clearInterval('authInterval')
    clearInterval('reIssueInterval')
    dispatch(resetAccessToken())
    removeRefreshToken()
    removeUser()
    dispatch(resetMenuState())
    removeRememberId()
    axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = null
    navigate(ROUTE_PATH_NAME.login, {replace: true})
  }

  const handleSubmit = async (values) => {
    const { status, message } = await Apis.admin.out(values)
    if (status === STATUS_SUCCESS) {
      enqueueSnackbar(makeSnackbarMessage(message), {
        variant: 'success',
        onExit: outProcess,
      })
      await sleep(DEFAULT_SLEEP_MS)
    } else {
      enqueueSnackbar(makeSnackbarMessage(message), { variant: 'error' })
    }
  }

  return (
    <CustomModal width='550' title='계정삭제' subtitle='삭제를 원하시면 비밀번호 입력 후 계정삭제 버튼을 클릭하세요.' open={open} handleClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({isSubmitting}) => (
          <Form>
            <Field
              component={TextField}
              type='password'
              autoFocus={open}
              fullWidth
              id='loginPw'
              name='loginPw'
              label='비밀번호 *'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Button
              fullWidth
              variant="contained"
              type='submit'
              size="large"
              color="error"
              sx={{ mt: 3 }}
              disabled={isSubmitting}
            >
              계정삭제
            </Button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default OutModal