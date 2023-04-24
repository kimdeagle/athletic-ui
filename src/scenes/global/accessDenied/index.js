import {Helmet} from "react-helmet-async";
import {Box, Typography} from "@mui/material";

const AccessDenied = () => {
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
      <Helmet title='Access Denied' />
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={3}
      >
        접근 권한이 없습니다.
      </Typography>
    </Box>
  )
}

export default AccessDenied