import {Button} from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import {useNavigate} from "react-router-dom";
import {resetAccessToken} from "../../../redux/auth";
import {removeRefreshToken, removeUser} from "../../../utils/cookie";
import {resetMenuState} from "../../../redux/system/menu";
import {useDispatch} from "react-redux";
import * as Apis from "../../../apis";
import axios from "axios";
import {useSnackbar} from "notistack";
import {makeSnackbarMessage} from "../../../utils/util";
import {AUTHORIZATION_HEADER_NAME, STATUS_SUCCESS} from "../../../utils/const";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      const { status, message } = await Apis.auth.logout()
      if (status === STATUS_SUCCESS) {
        alert(message)
        clearInterval('authInterval')
        clearInterval('reIssueInterval')
        dispatch(resetAccessToken())
        removeRefreshToken()
        removeUser()
        dispatch(resetMenuState())
        axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = null
        navigate(ROUTE_PATH_NAME.login, {replace: true})
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