import CustomModal from "../index";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableRow,
  useTheme
} from "@mui/material";
import {RadioGroup, Select} from "formik-mui";
import {
  COMMON_CODE,
  SEARCH_CONDITION_IN_OUT_CD,
  SEARCH_CONDITION_PERIOD,
  VALIDATION_SCHEMA
} from "../../../utils/const";
import {getStringDate, isMinEndDt} from "../../../utils/util";
import {DatePicker} from "@mui/x-date-pickers";
import {useSelector} from "react-redux";
import {tokens} from "../../../theme";

const ALL = 'all'
const PERIOD_SELECT = 'select'

const SearchConditionModal = ({open, setOpen, searchCondition, handleCallback}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const codeList = useSelector(state => state.code.codeList)

  const initialValues = {
    period: ALL,
    startDt: new Date(),
    endDt: new Date(),
    inOutCd: ALL,
    inOutDtlCd: ALL,
  }

  //TODO 스키마 작성
  const validationSchema = ''

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (values) => {
    if (window.confirm("엑셀 다운로드 하시겠습니까?")) {
      const params = {
        ...values,
        startDt: values.period === ALL ? null : getStringDate(values.startDt),
        endDt: values.period === ALL ? null : getStringDate(values.endDt),
        inOutCd: values.inOutCd === ALL ? null : values.inOutCd,
        inOutDtlCd: values.inOutCd === ALL || values.inOutDtlCd === ALL ? null : values.inOutDtlCd,
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
            <TableContainer component={Box}>
              <Table>
                <TableBody
                  sx={{
                    "& th": { backgroundColor: colors.grey[700], width: '30%', textAlign: 'center', fontWeight: 800, borderRight: `1px solid ${colors.grey[200]}` },
                    "& td": { backgroundColor: colors.grey[800], width: '70%', pl: '20px' },
                    "& tr:last-child th, & tr:last-child td": { borderBottom: 0 },
                  }}
                >
                  {/* 기간검색 */}
                  {searchCondition.includes(SEARCH_CONDITION_PERIOD) &&
                    <>
                      <TableRow>
                        <TableCell component='th' scope='row'>기간 *</TableCell>
                        <TableCell>
                          <Field
                            component={RadioGroup}
                            row
                            id='period'
                            name='period'
                            color='primary'
                            variant='outlined'
                            margin='normal'
                          >
                            <FormControlLabel value={ALL} label='전체' control={<Radio />} />
                            <FormControlLabel value={PERIOD_SELECT} label='지정일자' control={<Radio />} />
                          </Field>
                        </TableCell>
                      </TableRow>
                      {values.period === PERIOD_SELECT &&
                        <>
                          <TableRow>
                            <TableCell component='th' scope='row'>시작일자 *</TableCell>
                            <TableCell>
                              <Field
                                component={DatePicker}
                                id='startDt'
                                name='startDt'
                                label='시작일자 *'
                                value={values.startDt}
                                onChange={(value) => setFieldValue('startDt', value)}
                                slotProps={{
                                  textField: {}
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component='th' scope='row'>종료일자 *</TableCell>
                            <TableCell>
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
                                    error: isMinEndDt(values),
                                    helperText: isMinEndDt(values) && VALIDATION_SCHEMA.END_DT.MinMessage,
                                  }
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        </>
                      }
                    </>
                  }
                  {/* 입출구분 */}
                  {searchCondition.includes(SEARCH_CONDITION_IN_OUT_CD) &&
                    <>
                      <TableRow>
                        <TableCell component='th' scope='row'>입출구분 *</TableCell>
                        <TableCell>
                          <Field
                            component={Select}
                            id='inOutCd'
                            name='inOutCd'
                            label='입출구분'
                            color='primary'
                            variant='outlined'
                            sx={{ width: '200px' }}
                            onChange={() => setFieldValue('inOutDtlCd', ALL)}
                          >
                            <MenuItem value={ALL}>전체</MenuItem>
                            {codeList.filter(data => data.code !== COMMON_CODE.DUES.REST).map(data => (
                              <MenuItem key={data.code} value={data.code}>{data.name}</MenuItem>
                            ))}
                          </Field>
                        </TableCell>
                      </TableRow>
                      {values.inOutCd !== ALL &&
                        <TableRow>
                          <TableCell component='th' scope='row'>입출상세 *</TableCell>
                          <TableCell>
                            <Field
                              component={Select}
                              id='inOutDtlCd'
                              name='inOutDtlCd'
                              label={codeList.find(data => data.code === values.inOutCd)?.name + '상세'}
                              color='primary'
                              variant='outlined'
                              sx={{ width: '200px' }}
                            >
                              <MenuItem value={ALL}>전체</MenuItem>
                              {codeList.find(data => data.code === values.inOutCd)?.detailList.map(detail => (
                                <MenuItem key={detail.code} value={detail.code}>{detail.name}</MenuItem>
                              ))}
                            </Field>
                          </TableCell>
                        </TableRow>
                      }
                    </>
                  }
                </TableBody>
              </Table>
            </TableContainer>
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