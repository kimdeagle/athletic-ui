import {NavLink, Outlet} from "react-router-dom";

const AuthRoute = ({authenticated, requireAuth}) => {
  if (authenticated && !requireAuth) return <NavLink to='/' />
  if (!authenticated && requireAuth) return <NavLink to='/login' />
  return <Outlet />
}

export default AuthRoute