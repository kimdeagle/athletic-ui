import {Paper, Table, TableBody, TableCell, TableContainer, TableRow, useTheme} from "@mui/material";
import {useSelector} from "react-redux";
import {tokens} from "../../../theme";

const DashboardDuesTable = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const duesStatisticsList = useSelector(state => state.statistics.duesStatisticsList)

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
            {duesStatisticsList?.map((statistics, index) => (
              <TableCell key={index} component='th'>{statistics.displayDate}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell component='th'>입금</TableCell>
            {duesStatisticsList?.map((statistics, index) => (
              <TableCell key={index}>{statistics.inAmount.toLocaleString()}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell component='th'>출금</TableCell>
            {duesStatisticsList?.map((statistics, index) => (
              <TableCell key={index}>{statistics.outAmount.toLocaleString()}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell component='th'>잔액</TableCell>
            {duesStatisticsList?.map((statistics, index) => (
              <TableCell key={index}>{statistics.restAmount.toLocaleString()}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DashboardDuesTable