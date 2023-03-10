import ContentHeader from "../../../components/content/ContentHeader";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useTheme,
} from "@mui/material";
import {tokens} from "../../../theme";
import {useDispatch, useSelector} from "react-redux";
import {useLayoutEffect, useState} from "react";
import {getMyInfo, resetAdmin} from "../../../redux/admin";
import ChangePwModal from "../../../components/modal/myInfo/ChangePwModal";
import OutModal from "../../../components/modal/myInfo/OutModal";

const MyInfo = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const admin = useSelector(state => state.admin.admin)
  const [openChangePwModal, setOpenChangePwModal] = useState(false)
  const [openOutModal, setOpenOutModal] = useState(false)

  useLayoutEffect(() => {
    dispatch(getMyInfo())
    return () => {
      dispatch(resetAdmin())
    }
  }, [])

  return (
    <Box m="20px">
      <ContentHeader title='내 정보' subTitle="내 정보 관리" hideButtons={true} />
      <Box
        maxWidth='50%'
      >
        <Box display='flex' justifyContent='end' alignItems='center'>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => setOpenChangePwModal(true)}
          >
            비밀번호 변경
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="error"
            sx={{ ml: 2 }}
            onClick={() => setOpenOutModal(true)}
          >
            계정삭제
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableBody
              sx={{
                "& tr:hover": {
                  backgroundColor: colors.grey[800],
                  "& td": {
                    fontWeight: 800
                  }
                },
                "& th": { backgroundColor: colors.grey[700], width: '20%', textAlign: 'center', fontWeight: 800, borderRight: `1px solid ${colors.grey[200]}` },
                "& td": { width: '80%', pl: '20px' },
                "& tr:last-child th, & tr:last-child td": { borderBottom: 0 },
              }}
            >
              <TableRow>
                <TableCell component='th' scope='row'>아이디</TableCell>
                <TableCell>{admin.loginId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>이름</TableCell>
                <TableCell>{admin.adminNm}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>이메일</TableCell>
                <TableCell>{admin.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>휴대폰 번호</TableCell>
                <TableCell>{admin.mobileNo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>최종 수정일시</TableCell>
                <TableCell>{admin.modDt}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ChangePwModal open={openChangePwModal} setOpen={setOpenChangePwModal} />
      <OutModal open={openOutModal} setOpen={setOpenOutModal} />
    </Box>
  )
}

export default MyInfo