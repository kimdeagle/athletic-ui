import * as MuiIcons from "@mui/icons-material";
import {Box, Typography, useTheme} from "@mui/material";
import React from "react";
import {tokens} from "../../theme";
import {MenuItem, SubMenu} from "react-pro-sidebar";
import {Link, useLocation} from "react-router-dom";

const mockMenuList = [
  {
    menuNo: '10000',
    menuNm: '메인',
    upMenuNo: null,
    menuUrl: '/',
    sortSeq: 1,
    useYn: 'Y',
    iconNm: 'HomeOutlined',
    children: []
  },
  {
    menuNo: '10001',
    menuNm: '연락처',
    upMenuNo: null,
    menuUrl: '/contacts',
    sortSeq: 2,
    useYn: 'Y',
    iconNm: 'PeopleOutlined',
    children: []
  },
  {
    menuNo: '10002',
    menuNm: '연락처 목록',
    upMenuNo: '10001',
    menuUrl: '/contacts/list',
    sortSeq: 2,
    useYn: 'Y',
    iconNm: 'ContactsOutlined',
    children: []
  },
  {
    menuNo: '10003',
    menuNm: '연락처 3단계',
    upMenuNo: '10002',
    menuUrl: '/contacts/list/3',
    sortSeq: 1,
    useYn: 'Y',
    iconNm: 'ContactsOutlined',
    children: []
  },
  {
    menuNo: '10004',
    menuNm: '연락처 추가',
    upMenuNo: '10001',
    menuUrl: '/contacts/add',
    sortSeq: 1,
    useYn: 'Y',
    iconNm: 'ContactsOutlined',
    children: []
  }
]

const SidebarMenu = ({isCollapsed}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const location = useLocation()

  const processMenuList = (menuList) => {
    menuList.map(menu => {
      const children = menuList.filter(m => menu.menuNo === m.upMenuNo).sort((a, b) => a.sortSeq - b.sortSeq)
      if (children) {
        processMenuList(children)
        menu.children = children
      }
    })
    return menuList.filter(n => n.upMenuNo === null).sort((a, b) => a.sortSeq - b.sortSeq)
  }

  const renderMenu = (menuList) => {
    return menuList.map(menu => {
      const MenuIcon = MuiIcons[menu.iconNm]
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
      >
        <Typography>{title}</Typography>
        {location.pathname !== to && <Link to={to} />}
      </MenuItem>
    )
  }

  return (
    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
      {renderMenu(processMenuList(mockMenuList))}
    </Box>
  )
}

export default SidebarMenu