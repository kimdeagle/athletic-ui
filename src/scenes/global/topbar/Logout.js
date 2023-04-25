import {Button} from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import {removeRefreshToken} from "../../../utils/cookie";
import * as Apis from "../../../apis";
import axios from "axios";
import {useSnackbar} from "notistack";
import {clearAllInterval, makeSnackbarMessage} from "../../../utils/util";
import {AUTHORIZATION_HEADER_NAME, STATUS_SUCCESS} from "../../../utils/const";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";
import {persistor} from "../../../redux/store";

const Logout = () => {
  const { enqueueSnackbar } = useSnackbar()

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      const { status, message } = await Apis.auth.logout()
      if (status === STATUS_SUCCESS) {
        //reset authorization of axios header
        axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = null
        //clear all interval
        await clearAllInterval()
        //remove refresh token
        await removeRefreshToken()
        //redux-persist purge(remove)
        await persistor.purge()
        alert(message)
        window.location.replace(ROUTE_PATH_NAME.login)
      } else {
        enqueueSnackbar(makeSnackbarMessage(message), { variant: 'error' })
      }
    }
  }

  return (
    <Button
      variant='outlined'
      size='large'
      color='primary'
      startIcon={<ExitToAppOutlinedIcon />}
      sx={{ m: '0 10px 0 10px' }}
      onClick={handleLogout}
    >
      로그아웃
    </Button>
  )
}

export default Logout