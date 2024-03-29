import {Box, Button, MenuItem, Typography} from "@mui/material";
import {useLayoutEffect, useState} from "react";
import CustomModal from "../index";
import {getStringDate, isMinEndDt, makeSnackbarMessage, sleep} from "../../../utils/util";
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

const ScheduleDetailModal = ({action, open, setOpen, schedule, setSchedule, handleCallback}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [initialValues, setInitialValues] = useState({})
  const codeList = useSelector(state => state.code.codeList)

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    bgColorCd: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredSelectedMessage),
  })

  const handleClose = () => {
    setInitialValues({})
    setSchedule({})
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
      }
      const { status, message } = action === BUTTONS_ADD ? await Apis.schedule.addSchedule(params) : await Apis.schedule.updateSchedule(params)
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
      const { status, message } = await Apis.schedule.deleteSchedule(id)
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

  useLayoutEffect(() => {
    if (action === BUTTONS_ADD) {
      setInitialValues({
        id: '',
        startDt: schedule.startDt,
        endDt: schedule.endDt,
        title: '',
        description: '',
        bgColorCd: 'BLUE',
      })
    } else if (action === BUTTONS_EDIT) {
      setInitialValues({...schedule})
    }
  }, [open])

  return (
    <CustomModal width={500} title={action === BUTTONS_ADD ? '일정 추가' : '일정 상세'} open={open} handleClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({values, setFieldValue, isSubmitting, setSubmitting}) => (
          <Form>
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
              label='일정명 *'
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
              component={Select}
              id='bgColorCd'
              name='bgColorCd'
              label='배경색 *'
              color='primary'
              variant='outlined'
              formControl={{ sx: { width: '100%', ...MARGIN_NORMAL }}}
            >
              {codeList.find(data => data.code === COMMON_CODE.BG_COLOR)?.detailList.map(({code, name:bgColor}) => (
                <MenuItem key={code} value={code}>
                  <Box
                    display='flex'
                    justifyContent='start'
                    alignItems='center'
                  >
                    <Box width='10px' height='10px' borderRadius='50%' bgcolor={bgColor} mr={1} />
                    <Typography variant='h5'>{code}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Field>
            <Button
              fullWidth
              variant="contained"
              type='submit'
              size="large"
              color="success"
              sx={{ mt: 3 }}
              disabled={isSubmitting}
            >
              {action === BUTTONS_ADD ? '일정 추가' : '일정 수정'}
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
                일정 삭제
              </Button>
            }
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default ScheduleDetailModal