import {tokens} from "../../../theme";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup, Link,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import {useLayoutEffect, useState} from "react";
import {getRememberId, removeRememberId, setRememberId} from "../../../utils/cookie";
import {useNavigate} from "react-router-dom";

const Login = ({handleLogin}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isRememberId, setIsRememberId] = useState(false)
  const [loginId, setLoginId] = useState('')
  const [loginPw, setLoginPw] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isLoginSuccess = await handleLogin(loginId, loginPw)
    if (isLoginSuccess) {
      if (isRememberId) {
        setRememberId(loginId)
      } else {
        removeRememberId()
      }
      navigate('/')
    } else {
      return false
    }
  }

  useLayoutEffect(() => {
    const rememberId = getRememberId()
    if (rememberId) {
      setLoginId(rememberId)
      setIsRememberId(true)
    }
  }, [])

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      width="20%"
      height="100vh"
      m="10px auto"
    >
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        mb={3}
      >
        LOGIN
      </Typography>
      <Box component="form" width="100%" onSubmit={handleSubmit}>
        <TextField
          autoFocus
          required
          fullWidth
          id="loginId"
          name="loginId"
          variant="outlined"
          color="info"
          label="아이디"
          margin="normal"
          onChange={(e) => setLoginId(e.target.value)}
          value={loginId}
        />
        <TextField
          type="password"
          required
          fullWidth
          id="loginPw"
          name="loginPw"
          variant="outlined"
          color="info"
          label="비밀번호"
          margin="normal"
          onChange={(e) => setLoginPw(e.target.value)}
        />
        <FormGroup>
          <FormControlLabel
            label='아이디 저장'
            control={
              <Checkbox
                id='isRemember'
                sx={{color: `${colors.greenAccent[200]} !important`}}
                onChange={(e) => setIsRememberId(e.target.checked)}
                checked={isRememberId}
              />
            }
          />
        </FormGroup>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          color="info"
          sx={{ mt: 3 }}
        >
          LOGIN
        </Button>
      </Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        mt={2}
      >
        <Link
          component="button"
          variant="body1"
          underline="hover"
          color={colors.grey[100]}
          onClick={() => navigate("/reset-password")}
        >
          비밀번호 초기화
        </Link>
        <Link
          component="button"
          variant="body1"
          underline="hover"
          color={colors.grey[100]}
          onClick={() => navigate("/join")}
        >
          회원가입
        </Link>
      </Box>
    </Box>
  )
}

export default Login