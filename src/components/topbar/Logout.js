import {Button} from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import {useNavigate} from "react-router-dom";
import {resetAccessToken} from "../../redux/auth";
import {removeRefreshToken, removeUser} from "../../utils/cookie";
import {removeMenuList} from "../../redux/menu";
import {useDispatch} from "react-redux";

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      clearInterval('authInterval')
      clearInterval('reIssueInterval')
      dispatch(resetAccessToken())
      removeRefreshToken()
      removeUser()
      dispatch(removeMenuList())
      navigate('/login', {replace: true})
    }
  }

  return (
    <Button
      variant="outlined"
      size="large"
      color="info"
      startIcon={<ExitToAppOutlinedIcon />}
      sx={{ m: '0 10px 0 10px' }}
      onClick={handleLogout}
    >
      로그아웃
    </Button>
  )
}

export default Logout