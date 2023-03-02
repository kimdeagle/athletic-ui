import {NavLink, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {ROUTE_PATH_NAME} from "./RouteList";

const AuthRoute = ({requireAuth}) => {
  const authenticated = useSelector(state => state.auth.authenticated)

  if (authenticated && !requireAuth)
    return <NavLink to={ROUTE_PATH_NAME.home} />
  if (!authenticated && requireAuth)
    return <NavLink to={ROUTE_PATH_NAME.login} />

  return <Outlet />
}

export default AuthRoute