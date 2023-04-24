import React from "react";
import {Box, IconButton, Typography} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {useProSidebar} from "react-pro-sidebar";

const SidebarHeader = () => {
  const { collapsed, collapseSidebar } = useProSidebar()

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      m='20px 0 20px 0'
    >
      {!collapsed && <Typography variant='h3' fontWeight='bold' mr='30px'>Athletic</Typography>}
      <IconButton sx={{ mr: collapsed ? '5px' : undefined }} onClick={() => collapseSidebar()}><MenuOutlinedIcon /></IconButton>
    </Box>
  )
}

export default React.memo(SidebarHeader)