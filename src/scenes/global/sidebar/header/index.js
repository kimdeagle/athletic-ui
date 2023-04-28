import React from "react";
import {Box, IconButton, Typography} from "@mui/material";
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import {useProSidebar} from "react-pro-sidebar";

const SidebarHeader = () => {
  const { collapsed, collapseSidebar } = useProSidebar()

  return (
    <Box
      display='flex'
      justifyContent={!collapsed ? 'right' : 'center'}
      alignItems='center'
      m='20px 0 20px 0'
    >
      {!collapsed && <Typography variant='h3' fontWeight='bold' mr='30px'>Athletic</Typography>}
      <IconButton
        title={!collapsed ? '접기' : '펼치기'}
        onClick={() => collapseSidebar()}
        sx={{ mr: !collapsed ? '25px' : undefined }}
      >
        {!collapsed ? <KeyboardDoubleArrowLeftOutlinedIcon /> : <KeyboardDoubleArrowRightOutlinedIcon />}
      </IconButton>
    </Box>
  )
}

export default React.memo(SidebarHeader)