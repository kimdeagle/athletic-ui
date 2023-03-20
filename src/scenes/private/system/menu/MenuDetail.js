import {
  Box, Button,
  FormControlLabel,
  Radio, styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography, useTheme
} from "@mui/material";
import {Field, Form} from "formik";
import {CheckboxWithLabel, RadioGroup, TextField} from "formik-mui";
import {tokens} from "../../../../theme";
import {NEW_MENU, ROOT_MENU} from "../../../../utils/const";
import {useSelector} from "react-redux";

const HelperTextField = styled(Field)(() => ({
  '& .MuiFormHelperText-root': {
    whiteSpace: 'pre-wrap'
  }
}))

const iconNmHelperText = '[아이콘명 입력 예시]\nimport AbcOutlinedIcon from \'@mui/icons-material/AbcOutlined\'; 에서\n@mui/icons-material/ 뒤에 아이콘명(AbcOutlined)만 입력하세요.;'

const MenuDetail = ({selected, values, isSubmitting, handleDelete}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const authorityList = useSelector(state => state.authority.authorityList)

  return (
    <Box width='35%'>
      <Typography variant='h4' mb={2}>
        메뉴 상세
      </Typography>
      <Box
        bgcolor={colors.grey[900]}
        p={1}
      >
        <Form>
          <TableContainer component={Box}>
            <Table>
              <TableBody
                sx={{
                  "& th": { backgroundColor: colors.grey[700], width: '20%', textAlign: 'center', fontWeight: 800, borderRight: `1px solid ${colors.grey[200]}` },
                  "& td": { width: '80%', pl: '20px' },
                  "& tr:last-child th, & tr:last-child td": { borderBottom: 0 },
                }}
              >
                <TableRow>
                  <TableCell component='th' scope='row'>메뉴번호</TableCell>
                  <TableCell>{values.menuNo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>메뉴명 *</TableCell>
                  <TableCell>
                    <Field
                      component={TextField}
                      fullWidth
                      size='small'
                      id='menuNm'
                      name='menuNm'
                      color='primary'
                      variant='outlined'
                      disabled={selected === ROOT_MENU.menuNo}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>상위메뉴번호</TableCell>
                  <TableCell>{values.upMenuNo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>상위메뉴명</TableCell>
                  <TableCell>{values.upMenuNm}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>메뉴URL *</TableCell>
                  <TableCell>
                    <Field
                      component={TextField}
                      fullWidth
                      size='small'
                      id='menuUrl'
                      name='menuUrl'
                      color='primary'
                      variant='outlined'
                      disabled={selected === ROOT_MENU.menuNo}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>메뉴레벨</TableCell>
                  <TableCell>{values.menuLevel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>사용여부 *</TableCell>
                  <TableCell>
                    <Field
                      component={RadioGroup}
                      row
                      id='useYn'
                      name='useYn'
                      color='primary'
                      variant='outlined'
                      margin='normal'
                    >
                      <FormControlLabel value='Y' label='사용' control={<Radio disabled={selected === ROOT_MENU.menuNo} />} />
                      <FormControlLabel value='N' label='미사용' control={<Radio disabled={selected === ROOT_MENU.menuNo} />} />
                    </Field>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>정렬순서 *</TableCell>
                  <TableCell>
                    <Field
                      component={TextField}
                      fullWidth
                      size='small'
                      id='sortSeq'
                      name='sortSeq'
                      color='primary'
                      variant='outlined'
                      disabled={selected === ROOT_MENU.menuNo}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>메뉴권한 *</TableCell>
                  <TableCell>
                    {authorityList.length && authorityList.map(authority =>
                      <Field
                        key={authority.authNo}
                        component={CheckboxWithLabel}
                        type='checkbox'
                        name='authNoList'
                        checked={values.authNoList.includes(authority.authNo)}
                        Label={{ label: authority.authNm }}
                        color='primary'
                        value={authority.authNo}
                        disabled={selected === ROOT_MENU.menuNo}
                      />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>아이콘명</TableCell>
                  <TableCell>
                    <Box display='flex' justifyContent='start' alignItems='start'>
                      <HelperTextField
                        component={TextField}
                        fullWidth
                        size='small'
                        id='iconNm'
                        name='iconNm'
                        color='primary'
                        variant='outlined'
                        disabled={selected === ROOT_MENU.menuNo}
                        helperText={iconNmHelperText}
                      />
                      <Button
                        variant='text'
                        size='medium'
                        color='info'
                        disabled={isSubmitting || selected === ROOT_MENU.menuNo}
                        onClick={() => window.open('https://mui.com/material-ui/material-icons/', '_blank')}
                      >
                        찾아보기
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            display='flex'
            justifyContent='center'
            p={1}
          >
            <Button
              variant='contained'
              type='submit'
              size='small'
              color='success'
              sx={{ mr: 2 }}
              disabled={isSubmitting || selected === ROOT_MENU.menuNo}
            >
              {selected === NEW_MENU.menuNo ? '등록' : '수정'}
            </Button>
            <Button
              variant='contained'
              size='small'
              color='error'
              disabled={isSubmitting || selected === ROOT_MENU.menuNo}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

export default MenuDetail