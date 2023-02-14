import {Box, Button, TextField, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {tokens} from "../../../theme";
import * as Apis from "../../../apis";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";

const ResetPassword = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [params, setParams] = useState({})

  const handleChange = (e) => {
    setParams({...params, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await Apis.auth.resetPassword(params)
      if (data) {
        alert("임시 비밀번호를 이메일로 전송했습니다.\n확인 후 로그인 하세요.")
        navigate("/login", {replace: true})
      }
    } catch (e) {
      console.log(e)
      alert(e.response.data.message || '알 수 없는 오류')
    }
  }

  return (
    <>
      <Helmet title='Reset Password' />
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
          비밀번호 초기화
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
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            id="email"
            name="email"
            variant="outlined"
            color="info"
            label="이메일"
            margin="normal"
            onChange={handleChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            color="warning"
            sx={{ mt: 3 }}
          >
            비밀번호 초기화
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ResetPassword