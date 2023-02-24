import {
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import {useLayoutEffect, useState} from "react";
import CustomModal from "../index";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDaumPostcodePopup } from "react-daum-postcode";
import * as Const from "../../../utils/const";
import {replaceOnlyNumber} from "../../../utils/util";
import {useDispatch, useSelector} from "react-redux";
import * as Apis from "../../../apis";
import {resetMember} from "../../../redux/member";

const initialParams = {
  memberNo: '',
  memberNm: '',
  email: '',
  mobileNo: '',
  birthday: '',
  address: '',
  addressDtl: '',
  joinDt: ''
}

const AddMemberModal = ({action, open, setOpen, handleCallback}) => {
  const dispatch = useDispatch()
  const [params, setParams] = useState(initialParams)
  const openAddressPopup = useDaumPostcodePopup(Const.DAUM_POSTCODE_SCRIPT_URL)
  const member = useSelector(state => state.member.member)

  const handleChange = (e) => {
    setParams({...params, [e.target.name]: e.target.value})
  }

  const handleNumberInput = (e) => {
    e.target.value = replaceOnlyNumber(e.target.value)
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength)
  }

  const handleClose = () => {
    setParams(initialParams)
    setOpen(false)
  }

  const openSearchAddressPopup = () => {
    openAddressPopup({
      width: 500,
      height: 500,
      top: (window.innerHeight / 2) - 250,
      left: (window.innerWidth / 2) - 250,
      popupKey: 'popup1',
      onComplete: handleComplete,
    })
  }

  const handleComplete = (data) => {
    const address = data.roadAddress
    setParams({...params, address})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (window.confirm(action === Const.BUTTONS_ADD ? "추가하시겠습니까?" : "수정하시겠습니까?")) {
        const response = action === Const.BUTTONS_ADD ? await Apis.member.addMember(params) : await Apis.member.updateMember(params)
        if (response.code === 200) {
          alert(response.message)
          handleClose()
          handleCallback()
        }
      }
    } catch (e) {
      console.log(e)
      alert(e.response.data.message)
    }
  }

  useLayoutEffect(() => {
    if (action === Const.BUTTONS_EDIT)
      setParams({...params, ...member})
    return () => {
      dispatch(resetMember())
    }
  }, [open])

  return (
    <CustomModal width={500} title={action === Const.BUTTONS_ADD ? '회원 추가' : '회원 상세'} open={open} handleClose={handleClose}>
      <Box component="form" width="100%" onSubmit={handleSubmit}>
        <TextField
          autoFocus={open && action === Const.BUTTONS_ADD}
          fullWidth
          required={action === Const.BUTTONS_ADD}
          disabled={action === Const.BUTTONS_EDIT}
          id="memberNm"
          name="memberNm"
          variant="outlined"
          color="info"
          label="회원명"
          margin="normal"
          value={params.memberNm}
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
          value={params.email}
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
          value={params.mobileNo}
          inputProps={{ maxLength: 11}}
          helperText='숫자만 입력(ex. 01012345678)'
          onInput={handleNumberInput}
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
          value={params.birthday}
          inputProps={{ maxLength: 8}}
          helperText='숫자만 입력(ex. 20020101)'
          onInput={handleNumberInput}
          onChange={handleChange}
        />
        <Box
          display='flex'
          justifyContent='start'
          alignItems='center'
          mt={2}
          mb={1}
        >
          <TextField
            readOnly
            id="address"
            name="address"
            variant="outlined"
            color="info"
            label="주소"
            value={params.address}
            sx={{ width: '90%', mr: 1 }}
            onClick={() => params.address === '' && openSearchAddressPopup()}
          />
          <IconButton
            color='info'
            onClick={openSearchAddressPopup}
          >
            <SearchOutlinedIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          id="addressDtl"
          name="addressDtl"
          variant="outlined"
          color="info"
          label="상세주소"
          margin="normal"
          value={params.addressDtl}
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
          value={params.joinDt}
          inputProps={{ maxLength: 8}}
          helperText='숫자만 입력(ex. 20020101)'
          onInput={handleNumberInput}
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
          {action === Const.BUTTONS_ADD ? '회원 추가' : '회원 수정'}
        </Button>
      </Box>
    </CustomModal>
  )
}

export default AddMemberModal