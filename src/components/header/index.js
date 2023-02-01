import {Box, IconButton, Menu, MenuItem, Typography, useTheme} from "@mui/material";
import {useContext, useState} from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import {useNavigate} from "react-router-dom";

const Header = ({authenticated, handleLogout}) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box display="flex" justifyContent="end" p={2}>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          onClick={handleClick}
        >
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
          MenuListProps={{

          }}
        >
          {authenticated &&
            <MenuItem onClick={() => {
              setAnchorEl(null)
              navigate('/my')
            }}>
              <ManageAccountsOutlinedIcon />
              <Typography
                variant="body1"
                color={colors.grey[100]}
                fontWeight="bold"
                ml={1}
              >
                내 정보
              </Typography>
            </MenuItem>
          }
          <MenuItem onClick={() => authenticated ? handleLogout() : navigate('/login')}>
            {authenticated
              ? <LogoutOutlinedIcon fontSize="small" />
              : <LoginOutlinedIcon fontSize="small" />
            }
            <Typography
              variant="body1"
              color={colors.grey[100]}
              fontWeight="bold"
              ml={1}
            >
              {authenticated ? '로그아웃' : '로그인'}
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default Header