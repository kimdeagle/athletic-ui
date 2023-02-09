import {MenuItem} from "react-pro-sidebar";
import React from "react";
import {useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import {useLocation, useNavigate} from "react-router-dom";

const ChildMenu = ({title, icon, to}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const location = useLocation()

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

export default ChildMenu