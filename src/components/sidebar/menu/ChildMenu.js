import {MenuItem} from "react-pro-sidebar";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Helmet} from "react-helmet-async";

const ChildMenu = ({title, icon, to}) => {
  const { pathname } = useLocation()

  return (
    <>
      {pathname === to && <Helmet title={title} />}
      <MenuItem
        active={pathname === to}
        icon={icon}
        component={<Link to={to} />}
      >
        {title}
      </MenuItem>
    </>
  )
}

export default React.memo(ChildMenu)