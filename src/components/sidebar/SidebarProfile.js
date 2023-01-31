import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";

const SidebarProfile = ({adminNm, role}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box mb="25px">
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          alt="profile"
          width="100px"
          height="100px"
          src="https://picsum.photos/100/100"
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
      </Box>
      <Box textAlign="center">
        <Typography
          variant="h3"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "10px 0 5px 0" }}
        >
          {adminNm || 'Username'}
        </Typography>
        <Typography variant="h6" color={colors.greenAccent[500]}>
          {role}
        </Typography>
      </Box>
    </Box>
  )
}

export default SidebarProfile