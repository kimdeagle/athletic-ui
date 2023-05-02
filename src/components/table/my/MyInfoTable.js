import {Paper, Table, TableBody, TableCell, TableContainer, TableRow, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useSelector} from "react-redux";

const MyInfoTable = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const admin = useSelector(state => state.user.user)

  return (
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
            <TableCell>{admin?.loginId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>이름</TableCell>
            <TableCell>{admin?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>이메일</TableCell>
            <TableCell>{admin?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>휴대폰 번호</TableCell>
            <TableCell>{admin?.mobileNo}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>권한전시명</TableCell>
            <TableCell>{admin?.authorityDisplayName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>최종 수정일시</TableCell>
            <TableCell>{admin?.modDt}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MyInfoTable