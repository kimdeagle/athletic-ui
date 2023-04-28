import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {ROUTE_PATH_NAME} from "./RouteList";

const AuthRoute = ({requireAuth}) => {
  const authenticated = useSelector(state => state.auth.authenticated)

  //로그인 상태에서 비권한 페이지 접근
  if (authenticated && !requireAuth) {
    window.location.replace(ROUTE_PATH_NAME.home)
  }
  //비로그인 상태에서 권한 페이지 접근
  if (!authenticated && requireAuth) {
    window.location.replace(ROUTE_PATH_NAME.login)
  }

  return <Outlet />
}

export default AuthRoute