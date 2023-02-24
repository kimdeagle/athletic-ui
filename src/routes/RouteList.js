import React, {Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../scenes/global/loading";

const AuthRoute = React.lazy(() => import("./AuthRoute"))
const Login = React.lazy(() => import("../scenes/public/login"))
const Join = React.lazy(() => import("../scenes/public/join"))
const ResetPassword = React.lazy(() => import("../scenes/public/resetPassword"))
const Home = React.lazy(() => import("../scenes/private/home"))
const Member = React.lazy(() => import("../scenes/private/member"))
const NotFound = React.lazy(() => import("../scenes/global/notFound"))
const MyInfo = React.lazy(() => import("../scenes/private/myInfo"))

const RouteList = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<AuthRoute requireAuth={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<AuthRoute requireAuth={true} />}>
          <Route path='/' element={<Home />} />
          <Route path='/member' element={<Member />} />
          <Route path='/my' element={<MyInfo />} />
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default RouteList