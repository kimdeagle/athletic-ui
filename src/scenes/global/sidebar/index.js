import React from "react";
import {Sidebar, Menu, useProSidebar} from "react-pro-sidebar";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import SidebarHeader from "./header";
import SidebarProfile from "./profile";
import SidebarMenu from "./menu";

const ProSidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { collapsed } = useProSidebar()

  const menuItemStyles = {
    root: {
      fontSize: '15px',
      fontWeight: 500
    },
    icon: {
      color: colors.sidebar.menu.icon
    },
    subMenuContent: () => ({
      backgroundColor: !collapsed ? 'transparent' : colors.sidebar.menu.menuContent,
      paddingLeft: !collapsed ? '20px' : '10px'
    }),
    button: ({active}) => ({
      color: active ? colors.sidebar.menu.active.color : undefined,
      fontWeight: active ? 600 : undefined,
      "&:hover": {
        fontWeight: 600,
        color: colors.sidebar.menu.hover.color,
        backgroundColor: colors.sidebar.menu.hover.backgroundColor
      }
    }),
    label: ({open}) => ({
      fontWeight: open ? 600 : undefined
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <Sidebar
        backgroundColor={colors.sidebar.sidebar.backgroundColor}
        rootStyles={{
          border: 'none',
          color: colors.sidebar.sidebar.color
        }}
      >
        <Menu menuItemStyles={menuItemStyles}>
          {/* Header */}
          <SidebarHeader />
          {/* Profile */}
          <SidebarProfile />
          {/* Menu */}
          <SidebarMenu />
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default React.memo(ProSidebar)