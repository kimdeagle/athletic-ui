import React from "react";

const Home = React.lazy(() => import("./scenes/private/home"))
const Member = React.lazy(() => import("./scenes/private/member"))

const routes = [
  { path: '/', element: Home},
  { path: '/member', element: Member},
]

export default routes