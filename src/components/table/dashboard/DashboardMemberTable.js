import {Paper, Table, TableBody, TableCell, TableContainer, TableRow, useTheme} from "@mui/material";
import {useSelector} from "react-redux";
import {tokens} from "../../../theme";

const DashboardMemberTable = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const memberStatisticsList = useSelector(state => state.statistics.memberStatisticsList)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody
          sx={{
            "& th": { backgroundColor: colors.grey[700], textAlign: 'center', fontWeight: 800, borderRight: `1px solid ${colors.grey[200]}` },
            "& td": { textAlign: 'right', borderRight: `1px solid ${colors.grey[200]}`, paddingRight: '20px' },
            "& tr :last-child": { borderRight: 0 },
          }}
        >
          <TableRow>
            <TableCell component='th' width='10%'>날짜</TableCell>
            {memberStatisticsList.map((statistics, index) => (
              <TableCell key={index} component='th'>{statistics.displayDate}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell component='th'>가입 회원 수</TableCell>
            {memberStatisticsList.map((statistics, index) => (
              <TableCell key={index}>{statistics.joinCount.toLocaleString()}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell component='th'>총 회원 수</TableCell>
            {memberStatisticsList.map((statistics, index) => (
              <TableCell key={index} sx={{ fontWeight: 'bold' }}>{statistics.totalCount.toLocaleString()}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DashboardMemberTable