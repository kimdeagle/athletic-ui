import React from "react";
import * as Icons from "@mui/icons-material";
import {Box, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {MenuItem, SubMenu} from "react-pro-sidebar";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const SidebarMenu = ({isCollapsed}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const menuList = useSelector(state => state.menu.menuList)
  const location = useLocation()
  const navigate = useNavigate()

  const renderMenu = (list) => {
    return list.map(menu => {
      const MenuIcon = Icons[menu.iconNm]
      return (
        menu.children.length
          ?
          <Item
            key={menu.menuNo}
            title={menu.menuNm}
            icon={<MenuIcon />}
            to={menu.menuUrl}
          >
            {renderMenu(menu.children)}
          </Item>
          :
          <LeafItem
            key={menu.menuNo}
            title={menu.menuNm}
            icon={<MenuIcon />}
            to={menu.menuUrl}
          />
      )
    })
  }

  const Item = ({ title, icon, to, children }) => {
    return (
      <SubMenu
        title={title}
        icon={icon}
        defaultOpen={location.pathname.includes(to)}
        style={{ color: colors.grey[100] }}
      >
        {children}
      </SubMenu>
    )
  }

  const LeafItem = ({ title, icon, to }) => {
    return (
      <MenuItem
        active={location.pathname === to}
        icon={icon}
        style={{ color: colors.grey[100] }}
        onClick={() => navigate(to)}
      >
        {title}
      </MenuItem>
    )
  }

  return (
    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
      {renderMenu(menuList)}
    </Box>
  )
}

export default React.memo(SidebarMenu)