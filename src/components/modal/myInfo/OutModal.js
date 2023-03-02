import {Button} from "@mui/material";
import * as Apis from "../../../apis";
import CustomModal from "../index";
import {
  AUTHORIZATION_HEADER_NAME,
  DEFAULT_SLEEP_MS,
  VALIDATION_SCHEMA
} from "../../../utils/const";
import {useSnackbar} from "notistack";
import {resetAccessToken} from "../../../redux/auth";
import {removeRefreshToken, removeRememberId, removeUser} from "../../../utils/cookie";
import {removeMenuList} from "../../../redux/menu";
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
    dispatch(removeMenuList())
    removeRememberId()
    axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = null
    navigate(ROUTE_PATH_NAME.login, {replace: true})
  }

  const handleSubmit = async (values) => {
    try {
      const response = await Apis.admin.out(values)
      if (response.code === 200) {
        enqueueSnackbar(makeSnackbarMessage(response.message), {
          variant: 'success',
          onExit: outProcess,
        })
      }
    } catch (e) {
      console.log(e)
      enqueueSnackbar(makeSnackbarMessage(e.response.data.message), {
        variant: 'error',
      })
    }
    await sleep(DEFAULT_SLEEP_MS)
  }

  return (
    <CustomModal width='500' title='계정삭제' subtitle='삭제를 원하시면 비밀번호 입력 후 계정삭제 버튼을 클릭하세요.' open={open} handleClose={handleClose}>
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
              label='비밀번호'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="error"
              sx={{ mt: 3 }}
              disabled={isSubmitting}
              onClick={submitForm}
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