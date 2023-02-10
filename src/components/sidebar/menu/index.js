import React from "react";
import * as Icons from "@mui/icons-material";
import {Box} from "@mui/material";
import { useSelector } from "react-redux";
import ParentMenu from "./ParentMenu";
import ChildMenu from "./ChildMenu";
import {useProSidebar} from "react-pro-sidebar";

const SidebarMenu = ({selected, setSelected}) => {
  const { collapsed } = useProSidebar()
  const menuList = useSelector(state => state.menu.menuList)

  const renderMenu = (list) => {
    return list.map(menu => {
      const { menuNo, menuUrl, menuNm, iconNm, children } = menu
      const MenuIcon = Icons[iconNm]
      return (
        children.length
          ?
          <ParentMenu
            key={menuNo}
            title={menuNm}
            icon={<MenuIcon />}
            to={menuUrl}
          >
            {renderMenu(menu.children)}
          </ParentMenu>
          :
          <ChildMenu
            key={menuNo}
            title={menuNm}
            icon={<MenuIcon />}
            to={menuUrl}
          />
      )
    })
  }

  return (
    <Box paddingLeft={collapsed ? undefined : "10%"}>
      {renderMenu(menuList)}
    </Box>
  )
}

export default React.memo(SidebarMenu)