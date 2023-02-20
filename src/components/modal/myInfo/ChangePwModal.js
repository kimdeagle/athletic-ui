import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useState} from "react";
import * as Apis from "../../../apis";
import * as utils from "../../../utils/util";
import CustomModal from "../index";

const ChangePwModal = ({open, setOpen}) => {
  const [params, setParams] = useState({})
  const [validPassword, setValidPassword] = useState({
    isValid: false,
    helperText: ''
  })
  const [equalPassword, setEqualPassword] = useState({
    isEqual: false,
    helperText: ''
  })

  const validatePassword = (e) => {
    setParams({...params, [e.target.name]: e.target.value})
    utils.validatePw({ password: e.target.value, setValidPassword })

    const password = e.target.value
    const checkPassword = params['repeatPw']
    utils.checkEqualPw({password, checkPassword, setEqualPassword})
  }

  const checkEqualPassword = (e) => {
    setParams({...params, [e.target.name]: e.target.value})
    const password = params['changePw']
    const checkPassword = e.target.value
    utils.checkEqualPw({password, checkPassword, setEqualPassword})
  }

  const handleClose = () => {
    setParams({})
    setValidPassword({isValid: false, helperText: ''})
    setEqualPassword({isEqual: false, helperText: ''})
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!(validPassword.isValid && equalPassword.isEqual)) {
      alert("변경할 비밀번호를 확인해주세요.")
      return false;
    }
    try {
      //기존 비밀번호와 동일한지 체크
      const response = await Apis.auth.changePassword(params)
      if (response.code === 200) alert(response.message)
      handleClose()
      window.location.replace('/my')
    } catch (e) {
      console.log(e)
      alert(e.response.data.message)
    }
  }

  return (
    <CustomModal width='500' title='비밀번호 변경' open={open} handleClose={handleClose}>
      <Box component="form" width="100%" onSubmit={handleSubmit}>
        <TextField
          autoFocus={open}
          required
          fullWidth
          type="password"
          id="loginPw"
          name="loginPw"
          variant="outlined"
          color="info"
          label="현재 비밀번호"
          margin="normal"
          onChange={(e) => setParams({...params, [e.target.name]: e.target.value})}
        />
        <TextField
          required
          fullWidth
          type="password"
          id="changePw"
          name="changePw"
          variant="outlined"
          color="info"
          label="변경할 비밀번호"
          margin="normal"
          error={!validPassword.isValid && validPassword.helperText !== ''}
          helperText={validPassword.helperText}
          onChange={validatePassword}
        />
        <TextField
          required
          fullWidth
          type="password"
          id="repeatPw"
          name="repeatPw"
          variant="outlined"
          color="info"
          label="변경할 비밀번호 확인"
          margin="normal"
          error={!equalPassword.isEqual && equalPassword.helperText !== ''}
          helperText={equalPassword.helperText}
          onChange={checkEqualPassword}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          color="info"
          sx={{ mt: 3 }}
        >
          비밀번호 변경
        </Button>
      </Box>
    </CustomModal>
  )
}

export default ChangePwModal