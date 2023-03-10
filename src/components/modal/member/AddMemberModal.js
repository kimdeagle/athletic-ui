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
  DEFAULT_SLEEP_MS,
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
    memberNm: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .max(VALIDATION_SCHEMA.MEMBER_NM.MAX.length, VALIDATION_SCHEMA.MEMBER_NM.MAX.message),
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
    if (window.confirm(action === BUTTONS_ADD ? "?????????????????????????" : "?????????????????????????")) {
      try {
          const response = action === BUTTONS_ADD ? await Apis.member.addMember(values) : await Apis.member.updateMember(values)
          if (response.code === 200) {
            enqueueSnackbar(makeSnackbarMessage(response.message), {
              variant: 'success',
              onExit: handleExit,
            })
          }
      } catch (e) {
        enqueueSnackbar(makeSnackbarMessage(e.response.data.message), { variant: 'error' })
      }
      await sleep(DEFAULT_SLEEP_MS)
    }
  }

  useLayoutEffect(() => {
    if (action === BUTTONS_ADD) {
      setInitialValues({
        memberNo: '',
        memberNm: '',
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
    <CustomModal width={500} title={action === BUTTONS_ADD ? '?????? ??????' : '?????? ??????'} open={open} handleClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({values, setFieldValue, submitForm, isSubmitting}) => (
          <Form>
            <Field
              component={TextField}
              type='text'
              autoFocus={open && action === BUTTONS_ADD}
              fullWidth
              required={action === BUTTONS_ADD}
              disabled={action === BUTTONS_EDIT}
              id='memberNm'
              name='memberNm'
              label='?????????'
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
            <Field
              component={TextField}
              type='text'
              fullWidth
              id='birthday'
              name='birthday'
              label='????????????'
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
                label='??????'
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
              label='????????????'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Field
              component={TextField}
              type='text'
              fullWidth
              required
              id='joinDt'
              name='joinDt'
              label='????????????'
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
              {action === BUTTONS_ADD ? '?????? ??????' : '?????? ??????'}
            </Button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default AddMemberModal