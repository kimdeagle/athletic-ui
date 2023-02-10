import {MenuItem} from "react-pro-sidebar";
import React from "react";
import {Link, useLocation} from "react-router-dom";

const ChildMenu = ({title, icon, to}) => {
  const { pathname } = useLocation()

  return (
    <MenuItem
      active={pathname === to}
      icon={icon}
      component={<Link to={to} />}
    >
      {title}
    </MenuItem>
  )
}

export default React.memo(ChildMenu)