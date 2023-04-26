import {Typography, Box, useTheme, Button} from "@mui/material";
import { tokens } from "../../theme";
import {setExcelUploadModalProps, setOpenExcelUploadModal} from "../../redux/common";
import {useDispatch} from "react-redux";
import {
  BUTTON_PROPS_DISABLED, BUTTON_PROPS_ON_CLICK,
  BUTTON_PROPS_PARAMETERS, BUTTONS_ADD,
  BUTTONS_EXCEL_DOWNLOAD, BUTTONS_EXCEL_DOWNLOAD_SEARCH_CONDITION,
  BUTTONS_EXCEL_UPLOAD, BUTTONS_SEARCH, STATUS_SUCCESS,
} from "../../utils/const";
import {useSnackbar} from "notistack";
import * as Apis from "../../apis";
import {makeSnackbarMessage} from "../../utils/util";
import {useState} from "react";
import SearchConditionModal from "../modal/common/SearchConditionModal";

const ContentHeader = ({ title, subTitle, hideButtons, buttonProps }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const defaultButtonProps = {
    [BUTTONS_EXCEL_UPLOAD]: buttonProps?.[BUTTONS_EXCEL_UPLOAD] || { [BUTTON_PROPS_DISABLED]: true },
    [BUTTONS_EXCEL_DOWNLOAD]: buttonProps?.[BUTTONS_EXCEL_DOWNLOAD] ||  { [BUTTON_PROPS_DISABLED]: true },
    [BUTTONS_ADD]: buttonProps?.[BUTTONS_ADD] || { [BUTTON_PROPS_DISABLED]: true, [BUTTON_PROPS_ON_CLICK]: null },
    [BUTTONS_SEARCH]: buttonProps?.[BUTTONS_SEARCH] || { [BUTTON_PROPS_DISABLED]: true, [BUTTON_PROPS_ON_CLICK]: null }
  }

  const handleExcelUpload = () => {
    const params = defaultButtonProps[BUTTONS_EXCEL_UPLOAD][BUTTON_PROPS_PARAMETERS]
    dispatch(setOpenExcelUploadModal(true))
    dispatch(setExcelUploadModalProps(params))
  }

  const handleExcelDownload = async () => {
    const searchConditionList = defaultButtonProps[BUTTONS_EXCEL_DOWNLOAD][BUTTONS_EXCEL_DOWNLOAD_SEARCH_CONDITION]
    if (searchConditionList) {
      setOpen(true)
    } else {
      const { length, downloadUrl } = defaultButtonProps[BUTTONS_EXCEL_DOWNLOAD][BUTTON_PROPS_PARAMETERS]
      if (length === 0) {
        alert('다운로드 할 데이터가 없습니다.')
        return;
      }
      if (window.confirm('엑셀 다운로드 하시겠습니까? (총 ' + length + '건)')) {
        await downloadExcel({downloadUrl})
      }
    }
  }

  const handleModalCallback = async (searchParams) => {
    const { downloadUrl } = defaultButtonProps[BUTTONS_EXCEL_DOWNLOAD][BUTTON_PROPS_PARAMETERS]
    await downloadExcel({downloadUrl, ...searchParams})
  }

  const downloadExcel = async (params) => {
    const { status, message } = await Apis.common.downloadFile(params)
    const variant = status === STATUS_SUCCESS ? 'success' : 'error'
    enqueueSnackbar(makeSnackbarMessage(message), { variant })
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
      <Box>
        {title &&
          <Typography
            variant="h2"
            fontWeight="bold"
            mb={1}
          >
            {title}
          </Typography>}
        {subTitle &&
          <Typography
            variant="h5"
            color={colors.greenAccent[400]}
            ml={1}
          >
            {subTitle}
          </Typography>}
      </Box>
      {!hideButtons &&
        <Box
        sx={{
          "& button": {
            marginRight: "10px"
          }
        }}
      >
        <Button
          variant="contained"
          color="warning"
          disabled={defaultButtonProps[BUTTONS_EXCEL_UPLOAD][BUTTON_PROPS_DISABLED]}
          onClick={defaultButtonProps[BUTTONS_EXCEL_UPLOAD][BUTTON_PROPS_PARAMETERS] ? handleExcelUpload : undefined}
        >
          엑셀 업로드
        </Button>
        <Button
          variant="contained"
          color="info"
          disabled={defaultButtonProps[BUTTONS_EXCEL_DOWNLOAD][BUTTON_PROPS_DISABLED]}
          onClick={defaultButtonProps[BUTTONS_EXCEL_DOWNLOAD][BUTTON_PROPS_PARAMETERS] ? handleExcelDownload : undefined}
        >
          엑셀 다운로드
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={defaultButtonProps[BUTTONS_ADD][BUTTON_PROPS_DISABLED]}
          onClick={defaultButtonProps[BUTTONS_ADD][BUTTON_PROPS_ON_CLICK]}
        >
          신규
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={defaultButtonProps[BUTTONS_SEARCH][BUTTON_PROPS_DISABLED]}
          onClick={defaultButtonProps[BUTTONS_SEARCH][BUTTON_PROPS_ON_CLICK]}
        >
          조회
        </Button>
      </Box>}
      <SearchConditionModal open={open} setOpen={setOpen} searchCondition={defaultButtonProps[BUTTONS_EXCEL_DOWNLOAD][BUTTONS_EXCEL_DOWNLOAD_SEARCH_CONDITION]} handleCallback={handleModalCallback} />
    </Box>
  )
}

export default ContentHeader