import React, {Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import {useSelector} from "react-redux";
import Loading from "../components/etc/Loading";
// import AuthRoute from "./AuthRoute";
// import Login from "../scenes/public/login";
// import ResetPassword from "../scenes/public/resetPassword";
// import Join from "../scenes/public/join";
// import Member from "../scenes/private/member";
// import Home from "../scenes/private/home";
// import NotFound from "../scenes/etc/notFound";

const AuthRoute = React.lazy(() => import("./AuthRoute"))
const Login = React.lazy(() => import("../scenes/public/login"))
const Join = React.lazy(() => import("../scenes/public/join"))
const ResetPassword = React.lazy(() => import("../scenes/public/resetPassword"))
const Home = React.lazy(() => import("../scenes/private/home"))
const Member = React.lazy(() => import("../scenes/private/member"))
const NotFound = React.lazy(() => import("../scenes/etc/notFound"))
const MyInfo = React.lazy(() => import("../scenes/private/myInfo"))

const RouteList = () => {
  const authenticated = useSelector(state => state.auth.authenticated)
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthRoute authenticated={authenticated} requireAuth={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<AuthRoute authenticated={authenticated} requireAuth={true} />}>
          <Route path='/' element={<Home title='Home' />} />
          <Route path='/member' element={<Member title='회원 관리' />} />
          <Route path='/my' element={<MyInfo title='내 정보' />} />
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default RouteList