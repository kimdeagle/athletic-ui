import {Paper, Table, TableBody, TableCell, TableContainer, TableRow, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useSelector} from "react-redux";

const DashboardScheduleTable = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const scheduleList = useSelector(state => state.schedule.scheduleList)

  return (
    <TableContainer component={Paper} sx={{ width: '70%' }}>
      <Table>
        <TableBody
          sx={{
            "& th": { backgroundColor: colors.grey[700], textAlign: 'center', fontWeight: 800, borderRight: `1px solid ${colors.grey[200]}` },
            "& td": { borderRight: `1px solid ${colors.grey[200]}`, paddingRight: '20px' },
            "& tr :last-child": { borderRight: 0 },
          }}
        >
          <TableRow>
            <TableCell component='th' width='30%'>일정명</TableCell>
            <TableCell component='th' width='15%'>시작일자</TableCell>
            <TableCell component='th' width='15%'>종료일자</TableCell>
            <TableCell component='th' width='40%'>상세내용</TableCell>
          </TableRow>
          {scheduleList?.map((schedule, index) => (
            <TableRow key={index}>
              <TableCell align='left'>{schedule.title}</TableCell>
              <TableCell align='center'>{schedule.startDt}</TableCell>
              <TableCell align='center'>{schedule.endDt}</TableCell>
              <TableCell align='left'>{schedule.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DashboardScheduleTable