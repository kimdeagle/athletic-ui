import React from "react";

const Home = React.lazy(() => import("./scenes/private/home"))
const Member = React.lazy(() => import("./scenes/private/member"))

const routes = [
  { path: '/', title: 'Home', element: Home},
  { path: '/member', title: '회원 관리', element: Member},
]

export default routes