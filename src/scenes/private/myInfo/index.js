import ContentHeader from "../../../components/content/ContentHeader";
import {
  Box,
  Button,
} from "@mui/material";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {getMyInfo, resetAdmin} from "../../../redux/admin";
import ChangePwModal from "../../../components/modal/myInfo/ChangePwModal";
import OutModal from "../../../components/modal/myInfo/OutModal";
import MyInfoTable from "../../../components/table/my/MyInfoTable";

const MyInfo = () => {
  const dispatch = useDispatch()
  const [openChangePwModal, setOpenChangePwModal] = useState(false)
  const [openOutModal, setOpenOutModal] = useState(false)

  useEffect(() => {
    dispatch(getMyInfo())
    return () => {
      dispatch(resetAdmin())
    }
  }, [])

  return (
    <Box m="20px">
      <ContentHeader title='내 정보' subTitle="내 정보 관리" hideButtons={true} />
      <Box
        maxWidth='50%'
      >
        <Box display='flex' justifyContent='end' alignItems='center'>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => setOpenChangePwModal(true)}
          >
            비밀번호 변경
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="error"
            sx={{ ml: 2 }}
            onClick={() => setOpenOutModal(true)}
          >
            계정삭제
          </Button>
        </Box>
        <MyInfoTable />
      </Box>
      <ChangePwModal open={openChangePwModal} setOpen={setOpenChangePwModal} />
      <OutModal open={openOutModal} setOpen={setOpenOutModal} />
    </Box>
  )
}

export default MyInfo