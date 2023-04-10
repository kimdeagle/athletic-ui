import ContentHeader from "../../../components/content/ContentHeader";
import {
  Box,
  Paper,
  Table,
  TableBody, TableCell, TableContainer,
  TableRow,
  Typography,
  useTheme
} from "@mui/material";
import {
  BUTTON_PROPS_DISABLED,
  BUTTON_PROPS_PARAMETERS, BUTTONS_ADD, BUTTONS_EDIT,
  BUTTONS_EXCEL_DOWNLOAD, BUTTONS_EXCEL_DOWNLOAD_SEARCH_CONDITION,
  BUTTONS_EXCEL_UPLOAD, COMMON_CODE, SEARCH_CONDITION_PERIOD, STATUS_SUCCESS
} from "../../../utils/const";
import {useDispatch, useSelector} from "react-redux";
import * as Apis from "../../../apis";
import {
  getDateSubOneDays,
  getStringDate,
  getStringDateAddOneDays, getStringDateTime,
  makeSnackbarMessage,
} from "../../../utils/util";
import {useSnackbar} from "notistack";
import {
  getAmountThisMonth,
  getDuesList,
  resetAmountThisMonth,
  resetDuesList
} from "../../../redux/dues";
import React, {useEffect, useState, useLayoutEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {tokens} from "../../../theme";
import koLocale from "@fullcalendar/core/locales/ko";
import DuesDetailModal from "../../../components/modal/dues/DuesDetailModal";
import {format} from "date-fns";
import {getCodeListByGroupCodes, resetCodeList} from "../../../redux/code";

const groupCodes = [COMMON_CODE.DUES.IN, COMMON_CODE.DUES.OUT, COMMON_CODE.DUES.REST]

const Dues = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const duesList = useSelector(state => state.dues.duesList)
  const codeList = useSelector(state => state.code.codeList)
  const amountThisMonth = useSelector(state => state.dues.amountThisMonth)
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedDues, setSelectedDues] = useState({})
  const { enqueueSnackbar } = useSnackbar()
  const [eventList, setEventList] = useState([])

  /* 회비 현황 렌더링 */
  const renderAmountThisMonth = () => {
    return codeList.map(data => {
      const { code, name } = data
      const amount = amountThisMonth.find(amount => amount.inOutCd === code)?.amount || 0
      const backgroundColor = code === COMMON_CODE.DUES.IN ? colors.blue[700] : code === COMMON_CODE.DUES.OUT ? colors.orange[700] : colors.green[700]
      return (
        <React.Fragment key={code}>
          <TableCell
            component='th'
            scope='row'
            sx={{
              width: '5%',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '13px',
              border: `1px solid ${colors.grey[100]}`,
              backgroundColor
            }}
          >
            {name}
          </TableCell>
          <TableCell
            sx={{
              width: '28%',
              px: '20px',
              fontSize: '13px',
              border: `1px solid ${colors.grey[100]}`,
            }}
          >
            {amount.toLocaleString()}
          </TableCell>
        </React.Fragment>
      )
    })
  }

  const getDisplayTitle = (inOutCd, inOutDtlCd, oriTitle, amount) => {
    const inOutName = (codeList.find(data => data.code === inOutCd)?.name).substring(0, 1)
    const inOutDtlName = codeList.find(data => data.code === inOutCd)?.detailList.find(detail => detail.code === inOutDtlCd)?.name
    return '(' + inOutName + '-' + inOutDtlName + ')' + oriTitle + ' ' + amount.toLocaleString()
  }

  const getDisplayDues = (dues) => {
    const { id, inOutCd, inOutDtlCd, startDt:start, endDt:end, title:oriTitle, description, amount } = dues
    return {
      id,
      inOutCd,
      inOutDtlCd,
      start: getStringDate(start),
      end: getStringDateAddOneDays(end),
      title: getDisplayTitle(inOutCd, inOutDtlCd, oriTitle, amount),
      description,
      amount,
      oriTitle,
      textColor: colors.grey[100],
      backgroundColor: inOutCd === COMMON_CODE.DUES.IN ? colors.blue[700] : colors.orange[700],
      borderColor: inOutCd === COMMON_CODE.DUES.IN ? colors.blue[700] : colors.orange[700], //include list dot color
    }
  }

  const handleSearch = () => {
    dispatch(getAmountThisMonth())
    dispatch(getDuesList())
  }

  const excelUploadParams = {
    sampleName: 'dues',
    uploadUrl: '/dues/excel/upload',
    callback: handleSearch
  }

  const excelDownloadParams = {
    downloadUrl: '/dues/excel/download',
  }

  const buttonProps = {
    [BUTTONS_EXCEL_UPLOAD]: {
      [BUTTON_PROPS_DISABLED]: false,
      [BUTTON_PROPS_PARAMETERS]: excelUploadParams
    },
    [BUTTONS_EXCEL_DOWNLOAD]: {
      [BUTTON_PROPS_DISABLED]: false,
      [BUTTONS_EXCEL_DOWNLOAD_SEARCH_CONDITION]: [SEARCH_CONDITION_PERIOD],
      [BUTTON_PROPS_PARAMETERS]: excelDownloadParams
    },
  }

  const handleDateSelect = (selected) => {
    const startDt = selected.start
    const endDt = getDateSubOneDays(selected.end)
    setSelectedDues({startDt, endDt})
    setAction(BUTTONS_ADD)
    setOpen(true)
  }

  const getSelectedParams = (selected) => {
    const { id, start:startDt, end:endDt} = selected.event
    const { inOutCd, inOutDtlCd, description, amount, oriTitle:title } = selected.event.extendedProps
    return {id, inOutCd, inOutDtlCd, startDt, endDt, title, description, amount}
  }

  const handleEventClick = (selected) => {
    const params = {...getSelectedParams(selected), endDt: getDateSubOneDays(selected.event.end)}
    setSelectedDues(params)
    setAction(BUTTONS_EDIT)
    setTimeout(() => setOpen(true), 100)
  }

  const handleChange = async (selected) => {
    if (window.confirm("회비를 이동하시겠습니까?")) {
      const params = {...getSelectedParams(selected), startDt: getStringDateTime(selected.event.start), endDt: getStringDateTime(getDateSubOneDays(selected.event.end))}
      const { status, message } = await Apis.dues.updateDues(params)
      const variant = status === STATUS_SUCCESS ? 'success' : 'error'
      enqueueSnackbar(makeSnackbarMessage(message), { variant })
      if (status === STATUS_SUCCESS) {
        handleSearch()
      } else {
        selected.revert()
      }
    } else {
      selected.revert()
    }
  }

  useLayoutEffect(() => {
    dispatch(getCodeListByGroupCodes({groupCodes}))
    dispatch(getAmountThisMonth())
    dispatch(getDuesList())
    return () => {
      dispatch(resetCodeList())
      dispatch(resetAmountThisMonth())
      dispatch(resetDuesList())
    }
  }, [])

  useEffect(() => {
    setEventList(duesList.map(dues => getDisplayDues(dues)))
  }, [duesList])

  return (
    <Box m="20px">
      <ContentHeader title='회비 관리' subTitle="회비 관리" buttonProps={buttonProps} />
      <Box p={2}>
        {/* this month data */}
        {amountThisMonth.length && codeList.length &&
          <Box
            display='flex'
            justifyContent='center'
            alignItems='start'
            flexDirection='column'
            mb={2}
          >
            <Typography variant='h4' fontWeight='bold' mb={1}>{format(new Date(), 'yyyy년 M월 회비 현황')}</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>{renderAmountThisMonth()}</TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        }
        {/* calender */}
        <Box
          mt={3}
          sx={{
            /* buttons */
            '& .fc .fc-button-primary': {
              color: colors.grey[100],
              backgroundColor: colors.blue[700],
              border: 0,
              '&:disabled': {
                backgroundColor: colors.grey[800]
              },
            },
            /* selected buttons */
            '& .fc .fc-button-primary:not(:disabled).fc-button-active': {
              fontWeight: 'bold',
              color: colors.grey[100],
              backgroundColor: colors.greenAccent[700],
              border: `1px solid ${colors.grey[100]}`,
            },

            /* day text */
            '& .fc-day': {
              fontWeight: 'bold',
            },

            /* list day text */
            '& .fc-day.fc-list-day>*': {
              fontWeight: 'normal',
            },

            /* saturday text */
            '& .fc-day.fc-day-sat': {
              color: colors.blue[500],
            },

            /* sunday text */
            '& .fc-day.fc-day-sun': {
              color: colors.red[500],
            },

            /* today */
            '& .fc .fc-daygrid-day.fc-day-today': {
              backgroundColor: `${colors.green[900]}80`,
              border: `3px solid ${colors.greenAccent[400]}`,
              '& .fc-daygrid-day-top': {
                justifyContent: 'space-between',
                '&:after': {
                  content: "'(today)'",
                  padding: '4px',
                }
              }
            },

            /* highlight */
            '& .fc .fc-highlight': {
              backgroundColor: colors.greenAccent[900],
            },

            /* other days */
            '& .fc-day.fc-day-other': {
              backgroundColor: colors.grey[900],
            },

            /* list - th */
            '& .fc .fc-list-sticky .fc-list-day>*': {
              background: `${colors.green[900]}`,
            },

            /* list - dues hover */
            '& .fc .fc-list-event:hover td': {
              cursor: 'pointer',
              backgroundColor: `${colors.green[900]}60`,
            },

            /* list - today */
            '& .fc .fc-list-day.fc-day-today .fc-list-day-text:after': {
              content: "' (today) '",
              fontWeight: 'bold'
            },
          }}
        >
          <FullCalendar
            locale={koLocale}
            height='70vh'
            plugins={[
              dayGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            headerToolbar={{
              left: 'prevYear prev next nextYear today',
              center: 'title',
              right: 'dayGridMonth listMonth'
            }}
            buttonText={{
              dayGridMonth: '달력',
              listMonth: '리스트'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventChange={handleChange}
            events={eventList}
          />
        </Box>
      </Box>
      <DuesDetailModal action={action} open={open} setOpen={setOpen} dues={selectedDues} setDues={setSelectedDues} handleCallback={handleSearch} />
    </Box>
  )
}

export default Dues