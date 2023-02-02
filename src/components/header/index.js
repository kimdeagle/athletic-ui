import {Box, IconButton, Menu, MenuItem, MenuList, Typography, useTheme} from "@mui/material";
import {useContext, useState} from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import {useNavigate} from "react-router-dom";

const Header = ({authenticated, handleLogout}) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleGoMyInfo = async () => {
    setAnchorEl(null)
    setTimeout(() => navigate('/my'), 10)
  }

  return (
    <Box display="flex" justifyContent="end" p={2}>
      <Box display="flex">
        {/* toggle theme icon button */}
        <IconButton
          size="large"
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === 'dark'
            ? <DarkModeOutlinedIcon />
            : <LightModeOutlinedIcon />
          }
        </IconButton>

        {/* my information icon button and submenu */}
        {authenticated &&
          <>
            <IconButton
              size="large"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
              <Menu
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                sx={{
                  "& .MuiMenuItem-root": {
                    marginBottom: '5px'
                  },
                }}
              >
              <MenuList>
                <MenuItem onClick={handleGoMyInfo}>
                  <InfoOutlinedIcon />
                  <Typography
                    variant="body1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    ml={1}
                  >
                    내 정보
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToAppOutlinedIcon />
                  <Typography
                    variant="body1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    ml={1}
                  >
                    로그아웃
                  </Typography>
                </MenuItem>
              </MenuList>
              </Menu>
          </>
        }
      </Box>
    </Box>
  )
}

export default Header