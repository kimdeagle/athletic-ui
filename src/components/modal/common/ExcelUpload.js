import CustomModal from "../index";
import {useDispatch, useSelector} from "react-redux";
import {
  setOpenExcelUploadModal,
  resetExcelUploadModalProps,
} from "../../../redux/common";
import {Box, Button} from "@mui/material";
import {useSnackbar} from "notistack";
import * as Apis from "../../../apis";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import {makeSnackbarMessage, sleep} from "../../../utils/util";
import {DEFAULT_SLEEP_MS, STATUS_SUCCESS, VALIDATION_SCHEMA} from "../../../utils/const";
import * as Yup from "yup";

const ExcelUpload = () => {
  const open = useSelector(state => state.common.openExcelUploadModal)
  const props = useSelector(state => state.common.excelUploadModalProps)
  const dispatch = useDispatch()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const initialValues = {
    file: null,
    filename: '',
  }

  const validationSchema = Yup.object().shape({
    filename: Yup.string().required(VALIDATION_SCHEMA.COMMON.fileRequiredMessage)
  })

  const handleClose = () => {
    dispatch(setOpenExcelUploadModal(false))
    dispatch(resetExcelUploadModalProps())
  }

  const handleChange = (e, setFieldValue) => {
    const filename = e.target.value.substring(e.target.value.lastIndexOf('\\') + 1)
    setFieldValue('file', e.target.files[0])
    setFieldValue('filename', filename)
    e.target.value = '' //reset value (동일 이름 파일 업로드 할 수 있게)
  }

  const downloadSample = async () => {
    const params = {
      sampleName: props.sampleName,
      downloadUrl: '/file/sample',
    }
    const { status, message } = await Apis.common.downloadFile(params)
    const variant = status === STATUS_SUCCESS ? 'success' : 'error'
    enqueueSnackbar(makeSnackbarMessage(message), { variant })
  }

  const handleSuccess = () => {
    props.callback()
    dispatch(setOpenExcelUploadModal(false))
  }

  const handleSubmit = async (values, {resetForm}) => {
    const formData = new FormData()
    formData.append('file', values.file)
    const params = {
      uploadUrl: props.uploadUrl,
      file: formData
    }
    const { status, message } = await Apis.common.uploadExcel(params)
    if (status === STATUS_SUCCESS) {
      enqueueSnackbar(makeSnackbarMessage(message), {
        variant: 'success',
        onExit: handleSuccess
      })
    } else {
      enqueueSnackbar(makeSnackbarMessage(message), {
        variant: 'error',
        persist: true,
        onEnter: () => window.addEventListener('mousedown', () => closeSnackbar()),
        onExit: () => window.removeEventListener('mousedown', () => closeSnackbar()),
      })
      resetForm()
    }
  }

  return (
    <CustomModal width='500' title='엑셀 업로드' open={open} handleClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({values, setFieldValue, isSubmitting}) => (
          <Form>
            <Box display='flex' justifyContent='start' alignItems='center' mt={2}>
              <Button
                variant='contained'
                size='medium'
                color='warning'
                disabled={isSubmitting}
                onClick={downloadSample}
              >
                샘플 다운로드
              </Button>
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' mt={1}>
              <Field
                component={TextField}
                type='text'
                disabled
                id='filename'
                name='filename'
                label='파일명 *'
                color='primary'
                variant='outlined'
                value={values.filename}
                sx={{ width: '75%' }}
              />
              <Button
                variant='contained'
                size='medium'
                color='primary'
                component='label'
                sx={{ width: '20%' }}
                disabled={isSubmitting}
              >
                파일 찾기
                <input hidden type='file' id='file' name='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' onChange={(e) => handleChange(e, setFieldValue)} />
              </Button>
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
              엑셀 업로드
            </Button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default ExcelUpload