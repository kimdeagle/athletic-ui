import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {useLayoutEffect, useState} from "react";
import * as Yup from "yup";
import * as Apis from "../../../../apis";
import {
  BUTTONS_ADD,
  BUTTONS_EDIT,
  COMMON_CODE,
  DEFAULT_SLEEP_MS, MARGIN_NORMAL,
  STATUS_SUCCESS
} from "../../../../utils/const";
import {makeSnackbarMessage, sleep} from "../../../../utils/util";
import {Field, Form, Formik} from "formik";
import {Select, TextField} from "formik-mui";
import {Box, Button, MenuItem} from "@mui/material";
import CustomModal from "../../index";
import {getCurrentUser} from "../../../../redux/auth";

const AdminDetailModal = ({action, open, setOpen, handleCallback}) => {
  const dispatch = useDispatch()
  const admin = useSelector(state => state.system.admin.admin)
  const { id:currentUserId } = useSelector(state => state.auth.user)
  const codeList = useSelector(state => state.code.codeList)
  const authorityList = useSelector(state => state.system.authority.authorityList)
  const { enqueueSnackbar } = useSnackbar()
  const [initialValues, setInitialValues] = useState({})

  const validationSchema = Yup.object().shape({
    name: '',
    loginId: '',
    email: '',
    mobileNo: ''
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
      const { status, message } = action === BUTTONS_ADD ? await Apis.system.admin.addAdmin(values) : await Apis.system.admin.updateAdmin(values)
      if (status === STATUS_SUCCESS) {
        if (action === BUTTONS_EDIT && currentUserId === values.id) {
          dispatch(getCurrentUser())
        }
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
        name: '',
        loginId: '',
        email: '',
        mobileNo: '',
        authorityId: '',
        approveStatusCd: ''
      })
    } else {
      setInitialValues({...admin})
    }
  }, [open])

  return (
    <CustomModal width={500} title={action === BUTTONS_ADD ? '관리자 추가' : '관리자 상세'} open={open} handleClose={handleClose}>
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
              label='관리자번호'
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
              label='관리자명 *'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Field
              component={TextField}
              type='text'
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
            <Field
              component={TextField}
              type='text'
              fullWidth
              id='mobileNo'
              name='mobileNo'
              label='휴대폰 번호 *'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              sx={{ ...MARGIN_NORMAL }}
            >
              <Field
                component={Select}
                id='authorityId'
                name='authorityId'
                label='권한'
                color='primary'
                variant='outlined'
                sx={{ width: '200px' }}
              >
                {authorityList?.map(authority =>
                  <MenuItem key={authority.id} value={authority.id}>{authority.displayName}</MenuItem>
                )}
              </Field>
              <Field
                component={Select}
                id='approveStatusCd'
                name='approveStatusCd'
                label='승인상태'
                color='primary'
                variant='outlined'
                sx={{ width: '200px' }}
              >
                {codeList?.find(data => data.code === COMMON_CODE.APPROVE_STATUS)?.detailList.map(detail =>
                  <MenuItem key={detail.code} value={detail.code}>{detail.name}</MenuItem>
                )}
              </Field>
            </Box>
            <Button
              fullWidth
              variant="contained"
              type='submit'
              size="large"
              color="success"
              sx={{ mt: 3 }}
              disabled={isSubmitting}
            >
              {action === BUTTONS_ADD ? '관리자 추가' : '관리자 수정'}
            </Button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default AdminDetailModal