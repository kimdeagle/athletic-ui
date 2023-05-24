import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {ROUTE_PATH_NAME} from "./RouteList";
import {useEffect} from "react";

const AuthRoute = ({requireAuth}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    //로그인 상태에서 비권한 페이지 접근
    if (isLoggedIn && !requireAuth) {
      window.location.replace(ROUTE_PATH_NAME.home)
    }
    //비로그인 상태에서 권한 페이지 접근
    if (!isLoggedIn && requireAuth) {
      window.location.replace(ROUTE_PATH_NAME.login)
    }
  }, [isLoggedIn])

  return <Outlet />
}

export default AuthRoute