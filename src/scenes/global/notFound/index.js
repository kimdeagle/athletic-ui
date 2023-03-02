import {Box, Typography} from "@mui/material";
import {Helmet} from "react-helmet-async";

const NotFound = () => {
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
      <Helmet title='Not Found' />
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={3}
      >
        페이지를 찾을 수 없습니다.
      </Typography>
    </Box>
  )
}

export default NotFound