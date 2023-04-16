import ContentHeader from "../../../components/content/ContentHeader";
import {Box, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {
  BUTTON_PROPS_DISABLED,
  BUTTON_PROPS_PARAMETERS, BUTTONS_ADD, BUTTONS_EDIT,
  BUTTONS_EXCEL_DOWNLOAD, BUTTONS_EXCEL_DOWNLOAD_SEARCH_CONDITION,
  BUTTONS_EXCEL_UPLOAD, COMMON_CODE, SEARCH_CONDITION_PERIOD, STATUS_SUCCESS
} from "../../../utils/const";
import {
  getDateSubOneDays,
  getStringDate,
  getStringDateAddOneDays,
  makeSnackbarMessage
} from "../../../utils/util";
import * as Apis from "../../../apis";
import CustomCalendar from "../../../components/calendar";
import React from "react";
import {getScheduleList, resetScheduleList} from "../../../redux/schedule";
import ScheduleDetailModal from "../../../components/modal/schedule/ScheduleDetailModal";
import {tokens} from "../../../theme";
import {getCodeListByGroupCodes, resetCodeList} from "../../../redux/code";

const groupCodes = [COMMON_CODE.BG_COLOR]

const Schedule = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState(null)
  const [eventList, setEventList] = useState([])
  const [selectedSchedule, setSelectedSchedule] = useState({})
  const scheduleList = useSelector(state => state.schedule.scheduleList)
  const codeList = useSelector(state => state.code.codeList)
  const { enqueueSnackbar } = useSnackbar()

  const getDisplaySchedule = (schedule) => {
    const { id, startDt:start, endDt:end, title, description, bgColor } = schedule
    const { detailList } = codeList.find(data => data.code === COMMON_CODE.BG_COLOR)
    const hexColor = detailList.find(detail => detail.code === bgColor)?.name
    return {
      id,
      start: getStringDate(start),
      end: getStringDateAddOneDays(end),
      title,
      description,
      bgColor,
      textColor: colors.grey[100],
      backgroundColor: hexColor,
      borderColor: hexColor
    }
  }

  const handleSearch = () => {
    dispatch(getScheduleList())
  }

  const excelUploadParams = {
    sampleName: 'schedule',
    uploadUrl: '/schedule/excel/upload',
    callback: handleSearch
  }

  const excelDownloadParams = {
    downloadUrl: '/schedule/excel/download',
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

  const handleEventSelect = (selected) => {
    const startDt = selected.start
    const endDt = getDateSubOneDays(selected.end)
    setSelectedSchedule({startDt, endDt})
    setAction(BUTTONS_ADD)
    setOpen(true)
  }

  const getSelectedParams = (selected) => {
    const { id, start:startDt, end:endDt, title } = selected.event
    const { description, bgColor } = selected.event.extendedProps
    return { id, startDt, endDt, title, description, bgColor }
  }

  const handleEventClick = (selected) => {
    const params = {...getSelectedParams(selected), endDt: getDateSubOneDays(selected.event.end)}
    setSelectedSchedule(params)
    setAction(BUTTONS_EDIT)
    setTimeout(() => setOpen(true), 100)
  }

  const handleEventChange = async (selected) => {
    if (window.confirm("일정을 이동하시겠습니까?")) {
      const params = {...getSelectedParams(selected), startDt: getStringDate(selected.event.start), endDt: getStringDate(getDateSubOneDays(selected.event.end))}
      const { status, message } = await Apis.schedule.updateSchedule(params)
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
    dispatch(getScheduleList())
    return () => {
      dispatch(resetCodeList())
      dispatch(resetScheduleList())
    }
  }, [])

  useEffect(() => {
    setEventList(scheduleList.length ? scheduleList.map(schedule => getDisplaySchedule(schedule)) : [])
  }, [scheduleList])

  return (
    <Box m="20px">
      <ContentHeader title='일정 관리' subTitle="일정 관리" buttonProps={buttonProps} />
      <Box p={2}>
        <CustomCalendar
          events={eventList}
          eventSelect={handleEventSelect}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
        />
      </Box>
      {/* schedule detail modal */}
      <ScheduleDetailModal action={action} open={open} setOpen={setOpen} schedule={selectedSchedule} setSchedule={setSelectedSchedule} handleCallback={handleSearch} />
    </Box>
  )
}

export default Schedule