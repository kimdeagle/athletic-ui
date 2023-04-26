import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {useLayoutEffect, useState} from "react";
import * as Yup from "yup";
import {BUTTONS_ADD, BUTTONS_EDIT, DEFAULT_SLEEP_MS, STATUS_SUCCESS, VALIDATION_SCHEMA} from "../../../../utils/const";
import * as Apis from "../../../../apis";
import {makeSnackbarMessage, sleep} from "../../../../utils/util";
import {resetAuthority} from "../../../../redux/system/authority";
import CustomModal from "../../index";
import { Formik, Form, Field } from "formik";
import {TextField} from "formik-mui";
import {Button} from "@mui/material";

const AuthorityDetailModal = ({action, open, setOpen, handleCallback}) => {
  const dispatch = useDispatch()
  const authority = useSelector(state => state.system.authority.authority)
  const { enqueueSnackbar } = useSnackbar()
  const [initialValues, setInitialValues] = useState({})

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .matches(VALIDATION_SCHEMA.AUTHORITY_NAME.MATCHES.regex, VALIDATION_SCHEMA.AUTHORITY_NAME.MATCHES.message),
    displayName: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
  })

  const handleClose = () => {
    setInitialValues({})
    setOpen(false)
  }

  const handleExit = () => {
    handleClose()
    handleCallback()
  }

  const handleSubmit = async (values) => {
    if (window.confirm(action === BUTTONS_ADD ? "추가하시겠습니까?" : "수정하시겠습니까?")) {
      const { status, message } = action === BUTTONS_ADD ? await Apis.system.authority.addAuthority(values) : await Apis.system.authority.updateAuthority(values)
      if (status === STATUS_SUCCESS) {
        enqueueSnackbar(makeSnackbarMessage(message), {
          variant: 'success',
          onExit: handleExit,
        })
        await sleep(DEFAULT_SLEEP_MS)
      } else {
        enqueueSnackbar(makeSnackbarMessage(message), { variant: 'error' })
      }
    }
  }

  useLayoutEffect(() => {
    if (action === BUTTONS_ADD) {
      setInitialValues({
        id: '',
        name: 'ROLE_',
        displayName: '',
      })
    } else {
      setInitialValues({...authority})
    }
    return () => {
      dispatch(resetAuthority())
    }
  }, [open])

  return (
    <CustomModal width={500} title={action === BUTTONS_ADD ? '권한 추가' : '권한 상세'} open={open} handleClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({isSubmitting}) => (
          <Form>
            <Field
              component={TextField}
              type='text'
              fullWidth
              disabled
              id='id'
              name='id'
              label='권한번호'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Field
              component={TextField}
              type='text'
              autoFocus={open && action === BUTTONS_ADD}
              fullWidth
              id='name'
              name='name'
              label='권한명 *'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Field
              component={TextField}
              type='text'
              fullWidth
              id='displayName'
              name='displayName'
              label='권한전시명 *'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Button
              fullWidth
              variant="contained"
              type='submit'
              size="large"
              color="success"
              sx={{ mt: 3 }}
              disabled={isSubmitting}
            >
              {action === BUTTONS_ADD ? '권한 추가' : '권한 수정'}
            </Button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default AuthorityDetailModal