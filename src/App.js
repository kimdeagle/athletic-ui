import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import * as Apis from "./apis"
import {useDispatch} from "react-redux";
import {
  removeLoginAt,
  removeRememberId,
  setLoginAt,
  setRememberId
} from "./utils/cookie";
import axios from "axios";
import React, {useEffect} from "react";
import RouteList from "./routes/RouteList";
import {ProSidebarProvider} from "react-pro-sidebar";
import Topbar from "./scenes/global/topbar";
import ProSidebar from "./scenes/global/sidebar";
import {Helmet} from "react-helmet-async";
import {
  AUTHORIZATION_HEADER_NAME, BEARER_PREFIX,
  IS_NOT_AUTHENTICATED_PATH_LIST,
  STATUS_SUCCESS
} from "./utils/const";
import ExcelUpload from "./components/modal/common/ExcelUpload";
import {useSnackbar} from "notistack";
import {makeSnackbarMessage} from "./utils/util";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import ko from "date-fns/locale/ko";
import {resetAuth, setAuth} from "./redux/auth";
import jwtDecode from "jwt-decode";


function App() {
  const [theme, colorMode] = useMode()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleLogin = async (values) => {
    const { status, message, data } = await Apis.auth.login(values)
    if (status === STATUS_SUCCESS) {
      //set rememberId
      values.isRemember ? setRememberId(values.loginId) : removeRememberId()
      //set loginAt
      setLoginAt()
      //handle success
      await handleSuccess(data)
    } else {
      handleError(message)
    }
  }

  const handleRefresh = async () => {
    const { status, message, data } = await Apis.auth.refresh()
    if (status === STATUS_SUCCESS) {
      await handleSuccess(data)
    } else {
      alert(message)
      await handleLogout()
    }
  }

  const handleSuccess = async (data) => {
    const { accessJwt, user, useMenuList } = data
    const { exp, iat } = jwtDecode(accessJwt)
    const refreshMs = (exp - iat - 60) * 1000 //만료 1분 전 refresh
    //set authorization of axios header
    axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = BEARER_PREFIX + accessJwt
    //set auth
    dispatch(setAuth({user, useMenuList}))
    //set refresh trigger
    setTimeout(handleRefresh, refreshMs)
  }

  const handleError = (message) => {
    enqueueSnackbar(makeSnackbarMessage(message), { variant: 'error' })
  }

  const handleLogout = async () => {
    const { status, message } = await Apis.auth.logout()
    if (status === STATUS_SUCCESS) {
      alert(message)
      //reset authorization of axios header
      axios.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = null
      //remove loginAt
      removeLoginAt()
      //reset auth
      dispatch(resetAuth())
    } else {
      handleError(message)
    }
  }

  useEffect(() => {
    if (!IS_NOT_AUTHENTICATED_PATH_LIST.includes(window.location.pathname)) {
      handleRefresh()
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
                <ProSidebar />
                <main className="content">
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                    <Topbar handleLogout={handleLogout} />
                    <RouteList handleLogin={handleLogin} />
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
