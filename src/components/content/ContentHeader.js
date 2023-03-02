import {Typography, Box, useTheme, Button} from "@mui/material";
import { tokens } from "../../theme";

const ContentHeader = ({ title, subTitle, hideButtons, buttonProps }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const defaultButtonProps = {
    excelUpload: buttonProps === undefined || buttonProps.excelUpload === undefined ? { disabled: true, onClick: null } : buttonProps.excelUpload,
    excelDownload: buttonProps === undefined || buttonProps.excelDownload === undefined ? { disabled: true, onClick: null } : buttonProps.excelDownload,
    add: buttonProps === undefined || buttonProps.add === undefined ? { disabled: true, onClick: null } : buttonProps.add,
    search: buttonProps === undefined || buttonProps.search === undefined ? { disabled: true, onClick: null } : buttonProps.search,
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={8}>
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
          onClick={defaultButtonProps.excelUpload.onClick}
        >
          엑셀 업로드
        </Button>
        <Button
          variant="contained"
          color="info"
          disabled={defaultButtonProps.excelDownload.disabled}
          onClick={defaultButtonProps.excelDownload.onClick}
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
    </Box>
  )
}

export default ContentHeader