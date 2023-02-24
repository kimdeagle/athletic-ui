import {IconButton, useTheme} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import {useContext} from "react";
import {ColorModeContext} from "../../../theme";

const ToggleTheme = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  return (
    <IconButton
      size="large"
      onClick={colorMode.toggleColorMode}
    >
      {theme.palette.mode === 'dark'
        ? <DarkModeOutlinedIcon />
        : <LightModeOutlinedIcon />
      }
    </IconButton>
  )
}

export default ToggleTheme