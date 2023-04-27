import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {ROUTE_PATH_NAME} from "./RouteList";

const AuthRoute = ({requireAuth}) => {
  const authenticated = useSelector(state => state.auth.authenticated)
  const useMenuList = useSelector(state => state.system.menu.useMenuList)
  const { authorityId } = useSelector(state => state.user.user)

  //로그인 상태에서 비권한 페이지 접근
  if (authenticated && !requireAuth) {
    window.location.replace(ROUTE_PATH_NAME.home)
  }
  //비로그인 상태에서 권한 페이지 접근
  if (!authenticated && requireAuth) {
    window.location.replace(ROUTE_PATH_NAME.login)
  }
  //메뉴 접근 권한 체크
  if (authenticated && requireAuth) {
    const authorities = useMenuList.find(menu => menu.menuUrl === window.location.pathname)?.authorities

    if (!authorities?.includes(authorityId)) {
      window.location.replace(ROUTE_PATH_NAME.accessDenied)
    }
  }

  return <Outlet />
}

export default AuthRoute