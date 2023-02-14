import {NavLink, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const AuthRoute = ({requireAuth}) => {
  const authenticated = useSelector(state => state.auth.authenticated)
  if (authenticated && !requireAuth) return <NavLink to='/' />
  if (!authenticated && requireAuth) return <NavLink to='/login' />
  return <Outlet />
}

export default AuthRoute