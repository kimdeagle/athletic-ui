import React, {Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../scenes/global/loading";

const AuthRoute = React.lazy(() => import("./AuthRoute"))
const Login = React.lazy(() => import("../scenes/public/login"))
const Join = React.lazy(() => import("../scenes/public/join"))
const ResetPassword = React.lazy(() => import("../scenes/public/resetPassword"))
const Home = React.lazy(() => import("../scenes/private/home"))
const Member = React.lazy(() => import("../scenes/private/member"))
const Dues = React.lazy(() => import("../scenes/private/dues"))
const MyInfo = React.lazy(() => import("../scenes/private/myInfo"))
const SystemMenu = React.lazy(() => import("../scenes/private/system/menu"))
const Schedule = React.lazy(() => import("../scenes/private/schedule"))
const SystemAuthority = React.lazy(() => import("../scenes/private/system/authority"))
const SystemAdmin = React.lazy(() => import("../scenes/private/system/admin"))
const NotFound = React.lazy(() => import("../scenes/global/notFound"))
const AccessDenied = React.lazy(() => import("../scenes/global/accessDenied"))

export const ROUTE_PATH_NAME = {
  login: '/login',
  join: '/join',
  resetPassword: '/reset-password',
  home: '/',
  member: '/member',
  dues: '/dues',
  myInfo: '/my',
  schedule: '/schedule',
  system: {
    menu: '/system/menu',
    authority: '/system/authority',
    admin: '/system/admin',
  },
  accessDenied: '/access-denied'
}

const RouteList = ({handleLogin}) => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthRoute requireAuth={false} />}>
          <Route path={ROUTE_PATH_NAME.login} element={<Login handleLogin={handleLogin} />} />
          <Route path={ROUTE_PATH_NAME.join} element={<Join />} />
          <Route path={ROUTE_PATH_NAME.resetPassword} element={<ResetPassword />} />
        </Route>
        <Route element={<AuthRoute requireAuth={true} />}>
          <Route path={ROUTE_PATH_NAME.home} element={<Home />} />
          <Route path={ROUTE_PATH_NAME.member} element={<Member />} />
          <Route path={ROUTE_PATH_NAME.dues} element={<Dues />} />
          <Route path={ROUTE_PATH_NAME.myInfo} element={<MyInfo />} />
          <Route path={ROUTE_PATH_NAME.schedule} element={<Schedule />} />
          <Route path={ROUTE_PATH_NAME.system.menu} element={<SystemMenu />} />
          <Route path={ROUTE_PATH_NAME.system.authority} element={<SystemAuthority />} />
          <Route path={ROUTE_PATH_NAME.system.admin} element={<SystemAdmin />} />
        </Route>
        <Route path={ROUTE_PATH_NAME.accessDenied} element={<AccessDenied />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default RouteList