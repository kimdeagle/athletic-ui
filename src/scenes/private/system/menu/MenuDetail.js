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
import {Field, Form, useFormikContext} from "formik";
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

const MenuDetail = ({selected, handleDelete}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const authorityList = useSelector(state => state.authority.authorityList)

  const { values, isSubmitting } = useFormikContext()

  return (
    <>
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
                  "& td": { backgroundColor: colors.grey[800], width: '80%', pl: '20px' },
                  "& tr:last-child th, & tr:last-child td": { borderBottom: 0 },
                }}
              >
                <TableRow>
                  <TableCell component='th' scope='row'>메뉴번호</TableCell>
                  <TableCell>{values.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>메뉴명 *</TableCell>
                  <TableCell>
                    <Field
                      component={TextField}
                      fullWidth
                      size='small'
                      id='name'
                      name='name'
                      color='primary'
                      variant='outlined'
                      disabled={selected === ROOT_MENU.id || isSubmitting}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>상위메뉴번호</TableCell>
                  <TableCell>{values.upMenuId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>상위메뉴명</TableCell>
                  <TableCell>{values.upMenuName}</TableCell>
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
                      disabled={selected === ROOT_MENU.id || isSubmitting}
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
                      <FormControlLabel value='Y' label='사용' control={<Radio disabled={selected === ROOT_MENU.id || isSubmitting} />} />
                      <FormControlLabel value='N' label='미사용' control={<Radio disabled={selected === ROOT_MENU.id || isSubmitting} />} />
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
                      disabled={selected === ROOT_MENU.id || isSubmitting}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>메뉴권한 *</TableCell>
                  <TableCell>
                    {authorityList?.map(authority =>
                      <Field
                        key={authority.id}
                        component={CheckboxWithLabel}
                        type='checkbox'
                        name='authorities'
                        checked={values.authorities.includes(authority.id)}
                        Label={{ label: authority.displayName }}
                        color='primary'
                        value={authority.id}
                        disabled={selected === ROOT_MENU.id || isSubmitting}
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
                        disabled={selected === ROOT_MENU.id || isSubmitting}
                        helperText={iconNmHelperText}
                      />
                      <Button
                        variant='text'
                        size='medium'
                        color='info'
                        disabled={isSubmitting || selected === ROOT_MENU.id || isSubmitting}
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
              disabled={isSubmitting || selected === ROOT_MENU.id}
            >
              {selected === NEW_MENU.id ? '등록' : '수정'}
            </Button>
            <Button
              variant='contained'
              size='small'
              color='error'
              disabled={isSubmitting || selected === ROOT_MENU.id}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Box>
        </Form>
      </Box>
    </>
  )
}

export default MenuDetail