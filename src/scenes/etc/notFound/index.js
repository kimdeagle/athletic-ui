import {Box, Link, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      width="100%"
      height="100vh"
      m="10px auto"
    >
      <Typography
        variant="h3"
        color={colors.grey[200]}
        fontWeight="bold"
        mb={3}
      >
        페이지를 찾을 수 없습니다.
      </Typography>
      <Link
        component="button"
        variant="h3"
        underline="hover"
        color={colors.greenAccent[500]}
        onClick={() => navigate(-1)}
      >
        돌아가기
      </Link>
    </Box>
  )
}

export default NotFound