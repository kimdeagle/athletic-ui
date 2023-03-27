import {
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import {useLayoutEffect, useState} from "react";
import CustomModal from "../index";
import {getStringDateTime, makeSnackbarMessage, sleep} from "../../../utils/util";
import * as Apis from "../../../apis";
import {
  BUTTONS_ADD,
  BUTTONS_EDIT,
  DEFAULT_SLEEP_MS,
  VALIDATION_SCHEMA
} from "../../../utils/const";
import { Formik, Form, Field } from "formik";
import {Select, TextField} from "formik-mui";
import {useSnackbar} from "notistack";
import * as Yup from "yup";
import {DatePicker} from "@mui/x-date-pickers";
import {format} from "date-fns";

const isMinEndDt = (values) => {
  const { startDt, endDt } = values
  return format(startDt, 'yyyyMMdd') > format(endDt, 'yyyyMMdd')
}

const DuesDetailModal = ({action, open, setOpen, dues, setDues, handleCallback}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [initialValues, setInitialValues] = useState({})

  const validationSchema = Yup.object().shape({
    inOut: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    title: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    amount: Yup.number()
      .typeError(VALIDATION_SCHEMA.COMMON.numberTypeErrorMessage)
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .min(1, '0원 이상의 금액을 입력하세요.'),
  })

  const handleClose = () => {
    setInitialValues({})
    setDues({})
    setOpen(false)
  }

  const handleExit = () => {
    handleClose()
    handleCallback()
  }

  const handleSubmit = async (values) => {
    if (window.confirm(action === BUTTONS_ADD ? "추가하시겠습니까?" : "수정하시겠습니까?")) {
      try {
        const params = {
          ...values,
          startDt: getStringDateTime(values.startDt),
          endDt: getStringDateTime(values.endDt),
          amount: parseInt(values.amount)
        }
        const response = action === BUTTONS_ADD ? await Apis.dues.addDues(params) : await Apis.dues.updateDues(params)
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

  const handleDelete = async (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        const response = await Apis.dues.deleteDues(id)
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
        id: '',
        inOut: '',
        startDt: dues.startDt,
        endDt: dues.endDt,
        title: '',
        description: '',
        amount: 0
      })
    } else if (action === BUTTONS_EDIT) {
      setInitialValues({...dues})
    }
  }, [open])

  return (
    <CustomModal width={500} title={action === BUTTONS_ADD ? '회비 추가' : '회비 상세'} open={open} handleClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({values, setFieldValue, isSubmitting}) => (
          <Form>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='start'
            >
              <Field
                component={Select}
                id='inOut'
                name='inOut'
                label='입출구분'
                color='primary'
                variant='outlined'
                sx={{ width: '200px' }}
              >
                <MenuItem value='IN'>입금</MenuItem>
                <MenuItem value='OUT'>출금</MenuItem>
              </Field>
              {action === BUTTONS_EDIT &&
                <Button
                  variant="contained"
                  size="medium"
                  color="error"
                  disabled={isSubmitting}
                  onClick={() => handleDelete(values.id)}
                >
                  회비 삭제
                </Button>
              }
            </Box>
            <Field
              component={DatePicker}
              id='startDt'
              name='startDt'
              label='시작일자'
              value={values.startDt}
              onChange={(value) => setFieldValue('startDt', value)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'normal',
                }
              }}
            />
            <Field
              component={DatePicker}
              id='endDt'
              name='endDt'
              label='종료일자'
              minDate={values.startDt}
              value={values.endDt}
              onChange={(value) => setFieldValue('endDt', value)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'normal',
                  error: isMinEndDt(values),
                  helperText: isMinEndDt(values) && VALIDATION_SCHEMA.END_DT.MinMessage,
                }
              }}
            />
            <Field
              component={TextField}
              type='text'
              fullWidth
              id='title'
              name='title'
              label='회비명'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Field
              component={TextField}
              type='text'
              fullWidth
              id='description'
              name='description'
              label='회비내용'
              color='primary'
              variant='outlined'
              margin='normal'
            />
            <Field
              component={TextField}
              type='text'
              fullWidth
              id='amount'
              name='amount'
              label='입출금액'
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
              {action === BUTTONS_ADD ? '회비 추가' : '회비 수정'}
            </Button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default DuesDetailModal