import ContentHeader from "../../../components/content/ContentHeader";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, useTheme,
} from "@mui/material";
import {tokens} from "../../../theme";

//TODO 테이블 컴포넌트화 시키기
const MyInfo = (props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      <ContentHeader title={props.title} subTitle="내 정보 관리" />
      <TableContainer
        sx={{
          maxWidth: '50%'
        }}
        component={Paper}
      >
        <Table>
          <TableBody
            sx={{
              "& tr:last-child th, & tr:last-child td": { borderBottom: 0 }
            }}
          >
            <TableRow>
              <TableCell width='20%' component='th' scope='row' sx={{ fontWeight: 800, borderRight: `1px solid ${colors.grey[100]}` }}>ID</TableCell>
              <TableCell width='80%'>test</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width='20%' component='th' scope='row' sx={{ fontWeight: 800, borderRight: `1px solid ${colors.grey[100]}` }}>NAME</TableCell>
              <TableCell width='80%'>test123</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default MyInfo