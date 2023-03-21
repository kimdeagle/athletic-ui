import React, {useMemo} from "react";
import * as Icons from "@mui/icons-material";
import {Box} from "@mui/material";
import { useSelector } from "react-redux";
import ParentMenu from "./ParentMenu";
import ChildMenu from "./ChildMenu";
import {useProSidebar} from "react-pro-sidebar";
import {getProcessedMenuList, isEmptyObject} from "../../../../utils/util";

const SidebarMenu = () => {
  const { collapsed } = useProSidebar()
  const useMenuList = useSelector(state => state.menu.useMenuList)

  const renderMenu = (list) => {
    return list.map(menu => {
      const { id, menuUrl, name, iconNm, children } = menu
      const MenuIcon = isEmptyObject(iconNm) ? null : Icons[iconNm]
      return (
        children.length
          ?
          <ParentMenu
            key={id}
            title={name}
            icon={MenuIcon && <MenuIcon />}
            to={menuUrl}
          >
            {renderMenu(children)}
          </ParentMenu>
          :
          <ChildMenu
            key={id}
            title={name}
            icon={MenuIcon && <MenuIcon />}
            to={menuUrl}
          />
      )
    })
  }

  const memoMenuList = useMemo(() => getProcessedMenuList(useMenuList), [useMenuList])

  return (
    <Box paddingLeft={collapsed ? undefined : "10%"}>
      {useMenuList.length && renderMenu(memoMenuList)}
    </Box>
  )
}

export default React.memo(SidebarMenu)