import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import * as Apis from "./apis"
import {useDispatch, useSelector} from "react-redux";
import {resetAccessToken, setAccessToken} from "./redux/auth";
import {getRefreshToken, getUser, removeRefreshToken, removeUser} from "./utils/cookie";
import axios from "axios";
import React, {useEffect} from "react";
import * as Const from "./utils/const";
import RouteList from "./routes/RouteList";
import {ProSidebarProvider} from "react-pro-sidebar";
import Topbar from "./scenes/global/topbar";
import ProSidebar from "./scenes/global/sidebar";
import {Helmet} from "react-helmet-async";


function App() {
  const [theme, colorMode] = useMode()
  const authenticated = useSelector(state => state.auth.authenticated)
  const dispatch = useDispatch()

  /* re issue access token function */
  const reIssueAccessToken = async () => {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      try {
        const token = await Apis.auth.reIssueAccessToken({refreshToken})
        const { accessToken, accessTokenExpiresIn } = token
        dispatch(setAccessToken({accessToken, accessTokenExpiresIn}))
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      } catch (e) {
        console.log(e)
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
      if (!Const.IS_NOT_AUTHENTICATED_PATH_LIST.includes(pathname) && (!refreshToken || !user)) {
        alert("인증이 만료되었습니다.\n다시 로그인 해주세요.")
        clearInterval(authInterval)
        clearInterval(reIssueInterval)
        dispatch(resetAccessToken())
        removeRefreshToken()
        removeUser()
        window.location.replace('/login')
      }
    }, Const.AUTH_INTERVAL_TIMEOUT)

    /* set interval re issue access token */
    const reIssueInterval = setInterval(async () => reIssueAccessToken(), Const.RE_ISSUE_ACCESS_TOKEN_INTERVAL_TIMEOUT)

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
                </main>
              </ProSidebarProvider>
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App;
