import {Box} from "@mui/material";
import ToggleTheme from "./ToggleTheme";
import Logout from "./Logout";
import {useSelector} from "react-redux";

const Topbar = ({handleLogout}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <Box display="flex" justifyContent="end" height='6%' p={2}>
      <Box display="flex" justifyContent='space-between' alignItems='center' mr={1}>
        {/* toggle theme icon button */}
        <ToggleTheme />

        {/* my information icon button and submenu */}
        {isLoggedIn && <Logout handleLogout={handleLogout} /> }
      </Box>
    </Box>
  )
}

export default Topbar