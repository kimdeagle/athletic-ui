import {Button} from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

const Logout = ({handleLogout}) => {

  return (
    <Button
      variant='outlined'
      size='large'
      color='primary'
      startIcon={<ExitToAppOutlinedIcon />}
      sx={{ m: '0 10px 0 10px' }}
      onClick={async () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
          await handleLogout()
        }
      }}
    >
      로그아웃
    </Button>
  )
}

export default Logout