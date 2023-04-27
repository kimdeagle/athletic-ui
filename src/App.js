import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import * as Apis from "./apis"
import {useDispatch, useSelector} from "react-redux";
import {setAccessToken} from "./redux/auth";
import {getRefreshToken, removeRefreshToken} from "./utils/cookie";
import axios from "axios";
import React, {useEffect} from "react";
import RouteList, {ROUTE_PATH_NAME} from "./routes/RouteList";
import {ProSidebarProvider} from "react-pro-sidebar";
import Topbar from "./scenes/global/topbar";
import ProSidebar from "./scenes/global/sidebar";
import {Helmet} from "react-helmet-async";
import {
  AUTH_INTERVAL_TIMEOUT, AUTHORIZATION_HEADER_NAME, BEARER_PREFIX,
  IS_NOT_AUTHENTICATED_PATH_LIST,
  RE_ISSUE_ACCESS_TOKEN_INTERVAL_TIMEOUT, STATUS_SUCCESS
} from "./utils/const";
import ExcelUpload from "./components/modal/common/ExcelUpload";
import {useSnackbar} from "notistack";
import {clearAllInterval, makeSnackbarMessage} from "./utils/util";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import ko from "date-fns/locale/ko";
import {persistor} from "./redux/store";


function App() {
  const [theme, colorMode] = useMode()
  const authenticated = useSelector(state => state.auth.authenticated)
  const intervalFlag = useSelector(state => state.auth.intervalFlag)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  /* re issue access token function */
  const reIssueAccessToken = async () => {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      const { status, message, data:token } = await Apis.auth.reIssueAccessToken({refreshToken})
      if (status === STATUS_SUCCESS) {
        //get token data
        const { accessToken } = token
        //set authorization of axios header
        axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = BEARER_PREFIX + accessToken
        //set auth
        await dispatch(setAccessToken(accessToken))
      } else {
        enqueueSnackbar(makeSnackbarMessage(message), { variant: 'error' })
      }
    }
  }

  useEffect(() => {
    /* set interval auth */
    if (intervalFlag) {
      window.authInterval = setInterval(async () => {
        const pathname = window.location.pathname
        const refreshToken = getRefreshToken()
        if (!IS_NOT_AUTHENTICATED_PATH_LIST.includes(pathname) && !refreshToken) {
          //reset authorization of axios header
          axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = null
          //clear all interval
          await clearAllInterval()
          //remove refresh token
          await removeRefreshToken()
          //redux-persist purge(remove)
          await persistor.purge()
          alert("인증이 만료되었습니다.\n다시 로그인 해주세요.")
          window.location.replace(ROUTE_PATH_NAME.login)
        }
      }, AUTH_INTERVAL_TIMEOUT)

      /* set interval re issue access token */
      window.reIssueInterval = setInterval(() => {
        reIssueAccessToken()
      }, RE_ISSUE_ACCESS_TOKEN_INTERVAL_TIMEOUT)
    }

  }, [intervalFlag])

  /* check auth */
  useEffect(() => {
    reIssueAccessToken()

    return () => {
      clearInterval(window.authInterval)
      clearInterval(window.reIssueInterval)
    }
  }, [])

  return (
    <>
      <Helmet titleTemplate='Athletic | %s' defaultTitle='Athletic' />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <div className="app">
              <ProSidebarProvider>
                {authenticated && <ProSidebar />}
                <main className="content">
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                    <Topbar />
                    <RouteList />
                    <ExcelUpload />
                  </LocalizationProvider>
                </main>
              </ProSidebarProvider>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App;
