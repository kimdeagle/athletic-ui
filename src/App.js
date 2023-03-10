import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import * as Apis from "./apis"
import {useDispatch, useSelector} from "react-redux";
import {resetAccessToken, setAccessToken} from "./redux/auth";
import {getRefreshToken, getUser, removeRefreshToken, removeUser} from "./utils/cookie";
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
  RE_ISSUE_ACCESS_TOKEN_INTERVAL_TIMEOUT
} from "./utils/const";
import ExcelUpload from "./components/modal/common/ExcelUpload";
import {useSnackbar} from "notistack";
import {makeSnackbarMessage} from "./utils/util";


function App() {
  const [theme, colorMode] = useMode()
  const authenticated = useSelector(state => state.auth.authenticated)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  /* re issue access token function */
  const reIssueAccessToken = async () => {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      try {
        const token = await Apis.auth.reIssueAccessToken({refreshToken})
        const { accessToken, accessTokenExpiresIn } = token
        dispatch(setAccessToken({accessToken, accessTokenExpiresIn}))
        axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = BEARER_PREFIX + accessToken
      } catch (e) {
        enqueueSnackbar(makeSnackbarMessage(e.response.data.message), { variant: 'error' })
      }
    }
  }

  /* check auth */
  useEffect(() => {
    reIssueAccessToken()

    /* set interval auth */
    const authInterval = setInterval(() => {
      const pathname = window.location.pathname
      const refreshToken = getRefreshToken()
      const user = getUser()
      if (!IS_NOT_AUTHENTICATED_PATH_LIST.includes(pathname) && (!refreshToken || !user)) {
        alert("????????? ?????????????????????.\n?????? ????????? ????????????.")
        clearInterval(authInterval)
        clearInterval(reIssueInterval)
        dispatch(resetAccessToken())
        removeRefreshToken()
        removeUser()
        window.location.replace(ROUTE_PATH_NAME.login)
      }
    }, AUTH_INTERVAL_TIMEOUT)

    /* set interval re issue access token */
    const reIssueInterval = setInterval(async () => reIssueAccessToken(), RE_ISSUE_ACCESS_TOKEN_INTERVAL_TIMEOUT)

    return () => {
      clearInterval('authInterval')
      clearInterval('reIssueInterval')
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
                  <Topbar />
                  <RouteList />
                  <ExcelUpload />
                </main>
              </ProSidebarProvider>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App;
