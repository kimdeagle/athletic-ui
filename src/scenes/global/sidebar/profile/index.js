import React from "react";
import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../../theme";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import {useProSidebar} from "react-pro-sidebar";
import {useSelector} from "react-redux";

const SidebarProfile = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { collapsed } = useProSidebar()
  const { name, authorityDisplayName } = useSelector(state => state.user.user)
  const loginAt = useSelector(state => state.user.loginAt)

  return (
    !collapsed &&
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
          fontWeight="bold"
          mt={2}
          mb={1}
        >
          {name || 'Username'}
        </Typography>
        <Typography
          variant="h5"
          color={colors.greenAccent[500]}
          mb={1}
        >
          {authorityDisplayName}
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mr={2}>
          <ArrowCircleRightOutlinedIcon
            fontSize="small"
            color="warning"
          />
          <Typography
            variant="h6"
            color={colors.primary[200]}
            ml={1}
          >
            {loginAt}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default React.memo(SidebarProfile)