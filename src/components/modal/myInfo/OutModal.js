import {Button} from "@mui/material";
import * as Apis from "../../../apis";
import CustomModal from "../index";
import {
  AUTHORIZATION_HEADER_NAME,
  DEFAULT_SLEEP_MS, STATUS_SUCCESS,
  VALIDATION_SCHEMA
} from "../../../utils/const";
import {useSnackbar} from "notistack";
import {removeLoginAt, removeRefreshToken, removeRememberId} from "../../../utils/cookie";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import {clearAllInterval, makeSnackbarMessage, sleep} from "../../../utils/util";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetAccessToken} from "../../../redux/auth";
import {resetUseMenuList} from "../../../redux/system/menu";
import {resetUser} from "../../../redux/user";

const OutModal = ({open, setOpen}) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const authenticated = useSelector(state => state.auth.authenticated)

  const handleClose = () => {
    setOpen(false)
  }

  const initialValues = {
    loginPw: ''
  }

  const validationSchema = Yup.object().shape({
    loginPw: Yup.string().required(VALIDATION_SCHEMA.COMMON.requiredMessage)
  })

  const outProcess = async () => {
    //remove rememberId
    removeRememberId()
    //reset authorization of axios header
    axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = null
    //clear all interval
    clearAllInterval()
    //remove loginAt
    removeLoginAt()
    //remove refresh token
    removeRefreshToken()
    //reset access token
    dispatch(resetAccessToken())
    //reset use menu list
    dispatch(resetUseMenuList())
    //reset user
    dispatch(resetUser())
    handleClose()
  }

  const handleSubmit = async (values) => {
    const { status, message } = await Apis.system.admin.out(values)
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

  useEffect(() => {
    if (!authenticated) {
      window.location.replace(ROUTE_PATH_NAME.login)
    }
  }, [authenticated])

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