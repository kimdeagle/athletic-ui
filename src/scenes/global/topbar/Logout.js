import {Button} from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import {removeLoginAt, removeRefreshToken} from "../../../utils/cookie";
import * as Apis from "../../../apis";
import axios from "axios";
import {useSnackbar} from "notistack";
import {clearAllInterval, makeSnackbarMessage} from "../../../utils/util";
import {AUTHORIZATION_HEADER_NAME, STATUS_SUCCESS} from "../../../utils/const";
import {ROUTE_PATH_NAME} from "../../../routes/RouteList";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetAccessToken} from "../../../redux/auth";
import {resetUseMenuList} from "../../../redux/system/menu";
import {resetUser} from "../../../redux/user";

const Logout = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const authenticated = useSelector(state => state.auth.authenticated)

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      const { status, message } = await Apis.auth.logout()
      if (status === STATUS_SUCCESS) {
        alert(message)
        //reset authorization of axios header
        axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = null
        //clear all interval
        clearAllInterval()
        //remove loginAt
        removeLoginAt()
        //remove refresh token
        removeRefreshToken()
        //reset access token
        dispatch(resetAccessToken())
        //reset use menu list
        dispatch(resetUseMenuList())
        //reset user
        dispatch(resetUser())
      } else {
        enqueueSnackbar(makeSnackbarMessage(message), { variant: 'error' })
      }
    }
  }

  useEffect(() => {
    if (!authenticated) {
      window.location.replace(ROUTE_PATH_NAME.login)
    }
  }, [authenticated])

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