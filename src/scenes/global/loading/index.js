import {CircularProgress} from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <CircularProgress
      color='primary'
      sx={{
        position: 'relative',
        top: '50%',
        left: '50%'
      }}
    />
  )
}

export default Loading