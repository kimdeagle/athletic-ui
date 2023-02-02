import React from "react";
import * as Icons from "@mui/icons-material";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import ParentMenu from "./ParentMenu";
import ChildMenu from "./ChildMenu";

const SidebarMenu = ({isCollapsed}) => {
  const menuList = useSelector(state => state.menu.menuList)

  const renderMenu = (list) => {
    return list.map(menu => {
      const MenuIcon = Icons[menu.iconNm]
      return (
        menu.children.length
          ?
          <ParentMenu
            key={menu.menuNo}
            title={menu.menuNm}
            icon={<MenuIcon />}
            to={menu.menuUrl}
          >
            {renderMenu(menu.children)}
          </ParentMenu>
          :
          <ChildMenu
            key={menu.menuNo}
            title={menu.menuNm}
            icon={<MenuIcon />}
            to={menu.menuUrl}
          />
      )
    })
  }

  return (
    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
      {renderMenu(menuList)}
    </Box>
  )
}

export default React.memo(SidebarMenu)