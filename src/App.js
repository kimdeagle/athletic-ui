import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import * as Apis from "./apis"
import {useDispatch, useSelector} from "react-redux";
import {resetAccessToken, setAccessToken} from "./redux/auth";
import {getRefreshToken, getUser, removeRefreshToken, removeUser, setRefreshToken, setUser} from "./utils/cookie";
import axios from "axios";
import React, {Suspense, useEffect} from "react";
import * as Const from "./utils/const";
import jwtDecode from "jwt-decode";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";

const Login = React.lazy(() => import("./scenes/login"))
const Join = React.lazy(() => import("./scenes/join"))
const ResetPassword = React.lazy(() => import("./scenes/resetPassword"))
const Home = React.lazy(() => import("./scenes/home"))
const NotFound = React.lazy(() => import("./scenes/notFound"))

function App() {
  const [theme, colorMode] = useMode()
  const authenticated = useSelector(state => state.auth.authenticated)
  const dispatch = useDispatch()

  /* handle login */
  const handleLogin = async (loginId, loginPw) => {
    try {
      const response = await Apis.auth.login({loginId, loginPw})
      const {accessToken, accessTokenExpiresIn, refreshToken, refreshTokenExpiresIn} = response.data

      dispatch(setAccessToken({accessToken, accessTokenExpiresIn}))
      setRefreshToken({refreshToken, refreshTokenExpiresIn})
      setAxiosHeaders(accessToken)
      const user = jwtDecode(accessToken)
      setUser({user, expires: refreshTokenExpiresIn})
      return true;
    } catch (e) {
      console.log(e)
      const status = e.response.status
      if (status === 401) {
        alert("아이디 또는 비밀번호를 확인해주세요.")
      } else {
        alert(e.response.data.message)
      }
      return false;
    }
  }

  /* handle logout */
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      clearInterval(authInterval)
      clearInterval(reIssueInterval)
      dispatch(resetAccessToken())
      removeRefreshToken()
      removeUser()
      window.location.replace('/login')
    }
  }

  /* set access token to authorization header */
  const setAxiosHeaders = (accessToken) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  }

  /* set interval auth */
  const authInterval = setInterval(() => {
    const pathname = window.location.pathname
    const refreshToken = getRefreshToken()
    const user = getUser()
    if (Const.IS_AUTHENTICATED_PATH_LIST.includes(pathname) && (!refreshToken || !user)) {
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

  /* re issue access token function */
  const reIssueAccessToken = async () => {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      try {
        const response = await Apis.auth.reIssueAccessToken({refreshToken})
        const { accessToken, accessTokenExpiresIn } = response.data
        dispatch(setAccessToken({accessToken, accessTokenExpiresIn}))
        setAxiosHeaders(accessToken)
      } catch (e) {
        console.log(e)
      }
    }
  }

  /* clear interval when change auth interval */
  useEffect(() => {
    return () => {
      clearInterval(authInterval)
      clearInterval(reIssueInterval)
    }
  }, [authInterval])

  /* re issue access token at once when component mounted */
  useEffect(() => {
    reIssueAccessToken()
  }, [])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {authenticated && <Sidebar />}
          <main className="content">
            <Header handleLogout={handleLogout} />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route element={<PrivateRoute authenticated={authenticated} requireAuth={false} />}>
                <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                <Route path="/join" element={<Join />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>
              <Route element={<PrivateRoute authenticated={authenticated} requireAuth={true} />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
