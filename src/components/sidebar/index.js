import React, {useState} from "react";
import {ProSidebar, Menu} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SidebarHeader from "./header";
import SidebarProfile from "./profile";
import SidebarMenu from "./menu";

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important"
        },
        "& .pro-menu-item": {
          fontSize: "15px !important"
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important"
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important"
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Header */}
          <SidebarHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          {/* Profile */}
          {!isCollapsed && <SidebarProfile />}
          {/* Menu */}
          <SidebarMenu isCollapsed={isCollapsed} />
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default React.memo(Sidebar)