import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import CustomModal from "../index";

/**
 * TODO
 * 1. 회원 추가
 * 이메일, 휴대폰번호, 주소/상세주소, 입회일자 쪼개기
 * 주소 api 추가(카카오?다음?)
 * 추가 버튼 클릭 시 회원명, 핸드폰번호 중복 체크
 * 2. 회원 리스트 조회
 * 3. 회원 상세 조회 및 수정
 * 4. 회원 삭제
 * 5. 엑셀 다운로드
 * 6. 엑셀 업로드
 */
const AddMemberModal = ({open, setOpen}) => {
  const [params, setParams] = useState({})

  const handleChange = (e) => {
    setParams({...params, [e.target.name]: e.target.value})
  }

  const handleClose = () => {
    setParams({})
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // try {
    //   const response = await Apis.auth.changeLoginPw(params)
    //   if (response.code === 200) alert(response.message)
    //   handleClose(params)
    //   window.location.replace('/my')
    // } catch (e) {
    //   console.log(e)
    //   alert(e.response.data.message)
    // }
  }

  return (
    <CustomModal title='회원 추가' open={open} handleClose={handleClose}>
      <Box component="form" width="100%" onSubmit={handleSubmit}>
        <TextField
          autoFocus={open}
          required
          fullWidth
          id="memberNm"
          name="memberNm"
          variant="outlined"
          color="info"
          label="회원명"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          variant="outlined"
          color="info"
          label="이메일"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          id="mobileNo"
          name="mobileNo"
          variant="outlined"
          color="info"
          label="휴대폰 번호"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="birthday"
          name="birthday"
          variant="outlined"
          color="info"
          label="생년월일"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="address"
          name="address"
          variant="outlined"
          color="info"
          label="주소"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="addressDtl"
          name="addressDtl"
          variant="outlined"
          color="info"
          label="상세주소"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          id="joinDt"
          name="joinDt"
          variant="outlined"
          color="info"
          label="입회일자"
          margin="normal"
          onChange={handleChange}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          color="success"
          sx={{ mt: 3 }}
        >
          회원 추가
        </Button>
      </Box>
    </CustomModal>
  )
}

export default AddMemberModal