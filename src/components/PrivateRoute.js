import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({authenticated, requireAuth}) => {
  if (requireAuth) {
    return (
      authenticated ? <Outlet /> : <Navigate to="/login" />
    )
  } else {
    return (
      authenticated ? <Navigate to="/" /> : <Outlet />
    )
  }
}

export default PrivateRoute