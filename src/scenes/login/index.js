import {tokens} from "../../theme";
import {Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography, useTheme} from "@mui/material";
import {useState} from "react";

/*TODO
 * 아이디 저장
 * 로그인 구현
 * 비밀번호 초기화
 * 회원가입
 */

const Login = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [values, setValues] = useState({})
  const [isRemember, setIsRemember] = useState(false)

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(values)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      width="50%"
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
      <Box component="form" width="50%" onSubmit={handleFormSubmit}>
        <TextField
          autoFocus
          required
          fullWidth
          id="loginId"
          name="loginId"
          variant="outlined"
          color="info"
          label="ID"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          type="password"
          required
          fullWidth
          id="loginPw"
          name="loginPw"
          variant="outlined"
          color="info"
          label="PASSWORD"
          margin="normal"
          onChange={handleChange}
        />
        <FormGroup>
          <FormControlLabel
            label='아이디 저장'
            control={
              <Checkbox
                id='isRemember'
                sx={{color: `${colors.greenAccent[200]} !important`}}
                onChange={(e) => setIsRemember(e.target.checked)}
                checked={isRemember}
              />
            }
          />
        </FormGroup>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          color="success"
          sx={{ mt: 3 }}
        >
          LOGIN
        </Button>
      </Box>
    </Box>
  )
}

export default Login