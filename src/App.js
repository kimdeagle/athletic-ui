import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Header from "./scenes/global/Header";
import Sidebar from "./scenes/global/Sidebar";
import Login from "./scenes/login";
import Main from "./scenes/main";

/*
 *TODO
 * Suspense - fallback component 만들기
 * jwt
 * authenticated
 * scrollTop
 */
function App() {
  const [theme, colorMode] = useMode()
  const authenticated = true

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {authenticated && <Sidebar />}
          <main className="content">
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Main />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
