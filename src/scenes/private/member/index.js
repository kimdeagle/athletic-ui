import ContentHeader from "../../../components/content/ContentHeader";
import {Box} from "@mui/material";
import {convertMobileNoWithMark, formatDateHyphen, getAgeFromBirthday} from "../../../utils/util";
import * as Const from "../../../utils/const";
import CustomGrid from "../../../components/grid";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMemberList, resetMemberList} from "../../../redux/member";
import AddMemberModal from "../../../components/modal/member/AddMemberModal";

const Member = () => {
  const dispatch = useDispatch()
  const memberList = useSelector(state => state.member.memberList)
  const [open, setOpen] = useState(false)

  const columns = [
    { field: 'id', headerName: 'No', width: 80, headerAlign: 'center', align: 'center'},
    { field: 'memberNm', headerName: 'Name', flex: 1, cellClassName: `${Const.DATA_GRID_CELL_CLASS_NAME.GREEN_COLOR} ${Const.DATA_GRID_CELL_CLASS_NAME.CURSOR_POINTER}`},
    { field: 'email', headerName: 'Email', flex: 1},
    { field: 'mobileNo', headerName: 'Mobile Number', flex: 1, valueGetter: (params) => convertMobileNoWithMark(params.row.mobileNo)},
    { field: 'age', headerName: 'Age', type: 'number', flex: 1, headerAlign: 'left', align: 'left', valueGetter: (params) => getAgeFromBirthday(params.row.birthday)},
    { field: 'address', headerName: 'Address', flex: 1},
    { field: 'joinDt', headerName: 'Join Date', flex: 1, valueGetter: (params) => formatDateHyphen(params.row.joinDt)}
  ]

  const handleAdd = () => {
    setOpen(true)
  }

  const buttonProps = {
    [Const.BUTTONS_ADD]: {
      [Const.BUTTON_PROPS_DISABLED]: false,
      [Const.BUTTON_PROPS_ON_CLICK]: handleAdd
    }
  }

  const handleCellClick = (params, event) => {
    if (params.field === 'memberNm') alert(params.value)
  }

  useEffect(() => {
    dispatch(getMemberList())
    return () => {
      dispatch(resetMemberList())
    }
  }, [])

  return (
    <Box m="20px">
      <ContentHeader title='회원 관리' subTitle="Member Management" buttonProps={buttonProps} />
      <CustomGrid
        rows={memberList}
        columns={columns}
        onCellClick={handleCellClick}
        disableColumnMenu={true}
      >
      </CustomGrid>
      <AddMemberModal open={open} setOpen={setOpen} />
    </Box>
  )
}

export default Member