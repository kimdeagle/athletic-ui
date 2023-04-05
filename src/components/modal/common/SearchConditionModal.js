import CustomModal from "../index";
import { Formik, Form, Field } from "formik";
import {Box, Button, FormControlLabel, Radio, Typography} from "@mui/material";
import {RadioGroup} from "formik-mui";
import {
  SEARCH_CONDITION_PERIOD,
  VALIDATION_SCHEMA
} from "../../../utils/const";
import {getStringDateTime, isMinEndDt} from "../../../utils/util";
import {DatePicker} from "@mui/x-date-pickers";

const PERIOD_ALL = 'all'
const PERIOD_SELECT = 'select'

const SearchConditionModal = ({open, setOpen, searchCondition, handleCallback}) => {

  const initialValues = {
    period: PERIOD_ALL,
    startDt: new Date(),
    endDt: new Date(),
  }

  const validationSchema = ''

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (values) => {
    if (window.confirm("엑셀 다운로드 하시겠습니까?")) {
      const params = {
        ...values,
        startDt: values.period === PERIOD_ALL ? null : getStringDateTime(values.startDt),
        endDt: values.period === PERIOD_ALL ? null : getStringDateTime(values.endDt),
      }
      handleCallback(params)
      handleClose()
    }
  }

  return (
    <CustomModal width={500} title='엑셀 다운로드 조건' open={open} handleClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({values, setFieldValue}) => (
          <Form>
            {/* 기간검색 */}
            {searchCondition.includes(SEARCH_CONDITION_PERIOD) &&
              <Box
                display='flex'
                flexDirection='column'
              >
                <Box
                  display='flex'
                  justifyContent='start'
                  alignItems='center'
                >
                  <Typography variant='h4' mr={2}>기간</Typography>
                  <Field
                    component={RadioGroup}
                    row
                    id='period'
                    name='period'
                    color='primary'
                    variant='outlined'
                    margin='normal'
                  >
                    <FormControlLabel value={PERIOD_ALL} label='전체' control={<Radio />} />
                    <FormControlLabel value={PERIOD_SELECT} label='지정일자' control={<Radio />} />
                  </Field>
                </Box>
                {values.period === PERIOD_SELECT &&
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Field
                      component={DatePicker}
                      id='startDt'
                      name='startDt'
                      label='시작일자 *'
                      value={values.startDt}
                      onChange={(value) => setFieldValue('startDt', value)}
                      slotProps={{
                        textField: {
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
                      onChange={(value) => setFieldValue('endDt', value)}
                      slotProps={{
                        textField: {
                          margin: 'normal',
                          error: isMinEndDt(values),
                          helperText: isMinEndDt(values) && VALIDATION_SCHEMA.END_DT.MinMessage,
                        }
                      }}
                    />
                  </Box>
                }
              </Box>
            }
            {/* other search conditions */}

            {/* excel download button */}
            <Button
              fullWidth
              variant='contained'
              type='submit'
              size='large'
              color='success'
              sx={{ mt: 3 }}
            >
              엑셀 다운로드
            </Button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  )
}

export default SearchConditionModal