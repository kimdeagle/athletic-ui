import {SubMenu} from "react-pro-sidebar";
import React from "react";
import {useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useLocation} from "react-router-dom";

const ParentMenu = ({title, icon, to, children}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const location = useLocation()
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

export default ParentMenu