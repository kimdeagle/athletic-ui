import {Typography, Box, useTheme, Button} from "@mui/material";
import { tokens } from "../../theme";
import {useLocation} from "react-router-dom";
import * as Const from "../../utils/const";

const ContentHeader = ({ title, subTitle, buttonProps }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const location = useLocation()

  const defaultButtonProps = {
    excelUpload: buttonProps === undefined || buttonProps.excelUpload === undefined ? { disabled: true, onClick: null } : buttonProps.excelUpload,
    excelDownload: buttonProps === undefined || buttonProps.excelDownload === undefined ? { disabled: true, onClick: null } : buttonProps.excelDownload,
    create: buttonProps === undefined || buttonProps.create === undefined ? { disabled: true, onClick: null } : buttonProps.create,
    search: buttonProps === undefined || buttonProps.search === undefined ? { disabled: true, onClick: null } : buttonProps.search,
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box mb="30px">
        {title &&
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            {title}
          </Typography>}
        {subTitle &&
          <Typography
            variant="h5"
            color={colors.greenAccent[400]}
          >
            {subTitle}
          </Typography>}
      </Box>
      {!Const.HIDE_BUTTON_PATHNAME_LIST.includes(location.pathname) &&
        <Box
        sx={{
          "& button": {
            marginRight: "10px"
          }
        }}
      >
        <Button
          variant="contained"
          size="small"
          color="warning"
          disabled={defaultButtonProps.excelUpload.disabled}
          onClick={defaultButtonProps.excelUpload.onClick}
        >
          엑셀 업로드
        </Button>
        <Button
          variant="contained"
          size="small"
          color="info"
          disabled={defaultButtonProps.excelDownload.disabled}
          onClick={defaultButtonProps.excelDownload.onClick}
        >
          엑셀 다운로드
        </Button>
        <Button
          variant="contained"
          size="small"
          color="success"
          disabled={defaultButtonProps.create.disabled}
          onClick={defaultButtonProps.create.onClick}
        >
          신규
        </Button>
        <Button
          variant="contained"
          size="small"
          color="info"
          disabled={defaultButtonProps.search.disabled}
          onClick={defaultButtonProps.search.onClick}
        >
          조회
        </Button>
      </Box>}
    </Box>
  )
}

export default ContentHeader