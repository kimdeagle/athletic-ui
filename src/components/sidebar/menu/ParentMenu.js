import React, {useEffect, useState} from "react";
import {SubMenu} from "react-pro-sidebar";
import {useLocation} from "react-router-dom";

const ParentMenu = ({title, icon, to, children}) => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(pathname.includes(to))
  }, [pathname])

  return (
    <SubMenu
      label={title}
      icon={icon}
      // defaultOpen={pathname.includes(to)}
      open={open}
      onClick={() => setOpen((open) => !open)}
    >
      {children}
    </SubMenu>
  )
}

export default React.memo(ParentMenu)