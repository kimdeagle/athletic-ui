import {CircularProgress, useTheme} from "@mui/material";
import React from "react";
import {tokens} from "../../theme";

const Loading = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <CircularProgress
      sx={{
        color: colors.greenAccent[200],
        position: 'relative',
        top: '50%',
        left: '50%'
      }}
    />
  )
}

export default Loading