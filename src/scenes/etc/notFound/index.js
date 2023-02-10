import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";

const NotFound = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      width="100%"
      height="94%"
      m="0 auto"
    >
      <Typography
        variant="h3"
        color={colors.grey[200]}
        fontWeight="bold"
        mb={3}
      >
        페이지를 찾을 수 없습니다.
      </Typography>
    </Box>
  )
}

export default NotFound