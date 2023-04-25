import {
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import {useEffect, useState} from "react";
import CustomModal from "../index";
import {
  getStringDate,
  isEmptyObject,
  isMinEndDt,
  makeSnackbarMessage,
  sleep
} from "../../../utils/util";
import * as Apis from "../../../apis";
import {
  BUTTONS_ADD,
  BUTTONS_EDIT, COMMON_CODE,
  DEFAULT_SLEEP_MS, MARGIN_NORMAL, STATUS_SUCCESS,
  VALIDATION_SCHEMA
} from "../../../utils/const";
import { Formik, Form, Field } from "formik";
import {Select, TextField} from "formik-mui";
import {useSnackbar} from "notistack";
import * as Yup from "yup";
import {DatePicker} from "@mui/x-date-pickers";
import {useSelector} from "react-redux";

const DuesDetailModal = ({action, open, setOpen, dues, setDues, handleCallback}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [initialValues, setInitialValues] = useState({})
  const codeList = useSelector(state => state.code.codeList)

  const validationSchema = Yup.object().shape({
    inOutCd: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredSelectedMessage),
    inOutDtlCd: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredSelectedMessage),
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
      const params = {
        ...values,
        startDt: getStringDate(values.startDt),
        endDt: getStringDate(values.endDt),
        amount: parseInt(values.amount)
      }
      const { status, message } = action === BUTTONS_ADD ? await Apis.dues.addDues(params) : await Apis.dues.updateDues(params)
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

  const handleDelete = async (id, setSubmitting) => {
    setSubmitting(true)
    if (window.confirm("삭제하시겠습니까?")) {
      const { status, message } = await Apis.dues.deleteDues(id)
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
    setSubmitting(false)
  }

  useEffect(() => {
    if (action === BUTTONS_ADD) {
      setInitialValues({
        id: '',
        inOutCd: '',
        inOutDtlCd: '',
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
        {({values, setFieldValue, isSubmitting, setSubmitting}) => (
          <Form>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='start'
              sx={{ ...MARGIN_NORMAL }}
            >
              <Field
                component={Select}
                id='inOutCd'
                name='inOutCd'
                label='입출구분 *'
                color='primary'
                variant='outlined'
                sx={{ width: '200px' }}
                onChange={() => setFieldValue('inOutDtlCd', '')}
              >
                {codeList.filter(data => data.code !== COMMON_CODE.DUES.REST).map(data => (
                  <MenuItem key={data.code} value={data.code}>{data.name}</MenuItem>
                ))}
              </Field>
              {!isEmptyObject(values.inOutCd) &&
                <Field
                  component={Select}
                  id='inOutDtlCd'
                  name='inOutDtlCd'
                  label={codeList.find(data => data.code === values.inOutCd).name + '상세 *'}
                  color='primary'
                  variant='outlined'
                  sx={{ width: '200px' }}
                >
                  {codeList.find(data => data.code === values.inOutCd).detailList.map(detail => (
                    <MenuItem key={detail.code} value={detail.code}>{detail.name}</MenuItem>
                  ))}
                </Field>
              }
            </Box>
            <Field
              component={DatePicker}
              id='startDt'
              name='startDt'
              label='시작일자 *'
              value={values.startDt}
              disabled={isSubmitting}
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
              label='종료일자 *'
              minDate={values.startDt}
              value={values.endDt}
              disabled={isSubmitting}
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
              label='회비명 *'
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
              label='상세내용'
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
              label='입출금액 *'
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
            {action === BUTTONS_EDIT &&
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="error"
                disabled={isSubmitting}
                onClick={() => handleDelete(values.id, setSubmitting)}
                sx={{ mt: 2 }}
              >
                회비 삭제
              </Button>
            }
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default DuesDetailModal