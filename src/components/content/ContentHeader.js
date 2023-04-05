import {Typography, Box, useTheme, Button} from "@mui/material";
import { tokens } from "../../theme";
import {setExcelUploadModalProps, setOpenExcelUploadModal} from "../../redux/common";
import {useDispatch} from "react-redux";
import {
  BUTTON_PROPS_PARAMETERS,
  BUTTONS_EXCEL_DOWNLOAD, BUTTONS_EXCEL_DOWNLOAD_SEARCH_CONDITION,
  BUTTONS_EXCEL_UPLOAD,
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
    [BUTTONS_EXCEL_UPLOAD]: buttonProps === undefined || buttonProps[BUTTONS_EXCEL_UPLOAD] === undefined ? { disabled: true } : buttonProps[BUTTONS_EXCEL_UPLOAD],
    [BUTTONS_EXCEL_DOWNLOAD]: buttonProps === undefined || buttonProps[BUTTONS_EXCEL_DOWNLOAD] === undefined ? { disabled: true } : buttonProps[BUTTONS_EXCEL_DOWNLOAD],
    add: buttonProps === undefined || buttonProps.add === undefined ? { disabled: true, onClick: null } : buttonProps.add,
    search: buttonProps === undefined || buttonProps.search === undefined ? { disabled: true, onClick: null } : buttonProps.search,
  }

  const { length, downloadUrl } = defaultButtonProps[BUTTONS_EXCEL_DOWNLOAD][BUTTON_PROPS_PARAMETERS]

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
    await downloadExcel({downloadUrl, ...searchParams})
  }

  const downloadExcel = async (params) => {
    const { code, message } = await Apis.common.downloadExcel(params)
    const variant = code === 200 ? 'success' : 'error'
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
          disabled={defaultButtonProps.excelUpload.disabled}
          onClick={handleExcelUpload}
        >
          엑셀 업로드
        </Button>
        <Button
          variant="contained"
          color="info"
          disabled={defaultButtonProps.excelDownload.disabled}
          onClick={handleExcelDownload}
        >
          엑셀 다운로드
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={defaultButtonProps.add.disabled}
          onClick={defaultButtonProps.add.onClick}
        >
          신규
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={defaultButtonProps.search.disabled}
          onClick={defaultButtonProps.search.onClick}
        >
          조회
        </Button>
      </Box>}
      <SearchConditionModal open={open} setOpen={setOpen} searchCondition={defaultButtonProps[BUTTONS_EXCEL_DOWNLOAD][BUTTONS_EXCEL_DOWNLOAD_SEARCH_CONDITION]} handleCallback={handleModalCallback} />
    </Box>
  )
}

export default ContentHeader