import {
  Box,
  Button,
  IconButton,
} from "@mui/material";
import {useLayoutEffect, useState} from "react";
import CustomModal from "../index";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {makeSnackbarMessage, sleep} from "../../../utils/util";
import {useDispatch, useSelector} from "react-redux";
import * as Apis from "../../../apis";
import {resetMember} from "../../../redux/member";
import {
  BUTTONS_ADD,
  BUTTONS_EDIT,
  DAUM_POSTCODE_SCRIPT_URL,
  DEFAULT_SLEEP_MS, STATUS_SUCCESS,
  VALIDATION_SCHEMA
} from "../../../utils/const";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import {useSnackbar} from "notistack";
import * as Yup from "yup";

const AddMemberModal = ({action, open, setOpen, handleCallback}) => {
  const dispatch = useDispatch()
  const openAddressPopup = useDaumPostcodePopup(DAUM_POSTCODE_SCRIPT_URL)
  const member = useSelector(state => state.member.member)
  const { enqueueSnackbar } = useSnackbar()
  const [initialValues, setInitialValues] = useState({})

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .max(VALIDATION_SCHEMA.NAME.MAX.length, VALIDATION_SCHEMA.NAME.MAX.message),
    email: Yup.string()
      .matches(VALIDATION_SCHEMA.EMAIL.MATCHES.regex, VALIDATION_SCHEMA.EMAIL.MATCHES.message),
    mobileNo: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .matches(VALIDATION_SCHEMA.MOBILE_NO.MATCHES.regex, VALIDATION_SCHEMA.MOBILE_NO.MATCHES.message),
    birthday: Yup.string()
      .matches(VALIDATION_SCHEMA.BIRTHDAY.MATCHES.regex, VALIDATION_SCHEMA.BIRTHDAY.MATCHES.message),
    joinDt: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .matches(VALIDATION_SCHEMA.JOIN_DT.MATCHES.regex, VALIDATION_SCHEMA.JOIN_DT.MATCHES.message),
  })

  const handleClose = () => {
    setInitialValues({})
    setOpen(false)
  }

  const openSearchAddressPopup = (setFieldValue) => {
    openAddressPopup({
      width: 500,
      height: 500,
      top: (window.innerHeight / 2) - 250,
      left: (window.innerWidth / 2) - 250,
      popupKey: 'popup1',
      onComplete: (data) => setFieldValue('address', data.roadAddress),
    })
  }

  const handleExit = () => {
    handleClose()
    handleCallback()
  }

  const handleSubmit = async (values) => {
    if (window.confirm(action === BUTTONS_ADD ? "추가하시겠습니까?" : "수정하시겠습니까?")) {
      const { status, message } = action === BUTTONS_ADD ? await Apis.member.addMember(values) : await Apis.member.updateMember(values)
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
        name: '',
        email: '',
        mobileNo: '',
        birthday: '',
        address: '',
        addressDtl: '',
        joinDt: '',
      })
    } else if (action === BUTTONS_EDIT) {
      setInitialValues({...member})
    }
    return () => {
      dispatch(resetMember())
    }
  }, [open])

  return (
    <CustomModal width={500} title={action === BUTTONS_ADD ? '회원 추가' : '회원 상세'} open={open} handleClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({values, setFieldValue, isSubmitting}) => (
          <Form>
            <Field
              component={TextField}
              type='text'
              autoFocus={open && action === BUTTONS_ADD}
              fullWidth
              disabled={action === BUTTONS_EDIT}
              id='name'
              name='name'
              label='회원명 *'
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
              label='이메일'
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
            <Field
              component={TextField}
              type='text'
              fullWidth
              id='birthday'
              name='birthday'
              label='생년월일'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Box
              display='flex'
              justifyContent='start'
              alignItems='center'
              mt={2}
              mb={1}
            >
              <Field
                component={TextField}
                type='text'
                id='address'
                name='address'
                label='주소'
                color='primary'
                variant='outlined'
                margin='normal'
                readOnly
                sx={{ width: '90%', mr: 1 }}
                onClick={() => values.address.trim() === '' && openSearchAddressPopup(setFieldValue)}
              />
              <IconButton
                color='primary'
                onClick={() => openSearchAddressPopup(setFieldValue)}
              >
                <SearchOutlinedIcon />
              </IconButton>
            </Box>
            <Field
              component={TextField}
              type='text'
              fullWidth
              id='addressDtl'
              name='addressDtl'
              label='상세주소'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Field
              component={TextField}
              type='text'
              fullWidth
              id='joinDt'
              name='joinDt'
              label='입회일자 *'
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
              {action === BUTTONS_ADD ? '회원 추가' : '회원 수정'}
            </Button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default AddMemberModal