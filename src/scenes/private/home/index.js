import ContentHeader from "../../../components/content/ContentHeader";
import {Box, IconButton, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {useLayoutEffect} from "react";
import {
  getDuesStatisticsOfDashboard,
  getMemberStatisticsOfDashboard,
  resetDuesStatisticsList, resetMemberStatisticsList
} from "../../../redux/statistics";
import DashboardDuesTable from "../../../components/table/dashboard/DashboardDuesTable";
import DashboardMemberTable from "../../../components/table/dashboard/DashboardMemberTable";
import {getScheduleListOfDashboard, resetScheduleList} from "../../../redux/schedule";
import DashboardScheduleTable from "../../../components/table/dashboard/DashboardScheduleTable";
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import {useNavigate} from "react-router-dom";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    dispatch(getDuesStatisticsOfDashboard())
    dispatch(getMemberStatisticsOfDashboard())
    dispatch(getScheduleListOfDashboard())
    return () => {
      dispatch(resetDuesStatisticsList())
      dispatch(resetMemberStatisticsList())
      dispatch(resetScheduleList())
    }
  }, [])

  return (
    <Box m="20px">
      <ContentHeader title='Home' subTitle="Dashboard" hideButtons={true} />
      <Box mt={2} mb={3}>
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
          <Box display='flex' justifyContent='start' alignItems='center'>
            <Typography variant='h4'>회비 통계</Typography>
            <IconButton title='회비 관리로 이동' color='info' onClick={() => navigate(ROUTE_PATH_NAME.dues)}><ReadMoreOutlinedIcon /></IconButton>
          </Box>
          <Typography variant='h6'>(단위 : 원)</Typography>
        </Box>
        <DashboardDuesTable />
      </Box>
      <Box mt={2} mb={3}>
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={1}>
          <Box display='flex' justifyContent='start' alignItems='center'>
            <Typography variant='h4'>회원 통계</Typography>
            <IconButton title='회원 관리로 이동' color='info' onClick={() => navigate(ROUTE_PATH_NAME.member)}><ReadMoreOutlinedIcon /></IconButton>
          </Box>
          <Typography variant='h6'>(단위 : 명)</Typography>
        </Box>
        <DashboardMemberTable />
      </Box>
      <Box mt={2} mb={3}>
        <Box display='flex' justifyContent='start' alignItems='center' mb={1}>
          <Typography variant='h4'>일정 요약</Typography>
          <IconButton title='일정 관리로 이동' color='info' onClick={() => navigate(ROUTE_PATH_NAME.schedule)}><ReadMoreOutlinedIcon /></IconButton>
        </Box>
        <DashboardScheduleTable />
      </Box>
    </Box>
  )
}

export default Home