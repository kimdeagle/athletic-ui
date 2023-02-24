import ContentHeader from "../../../components/content/ContentHeader";
import {Box} from "@mui/material";
import {getAgeFromBirthday, isNotBlank, StringToDateHyphen} from "../../../utils/util";
import * as Const from "../../../utils/const";
import CustomGrid from "../../../components/grid";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMember, getMemberList, resetMemberList} from "../../../redux/member";
import AddMemberModal from "../../../components/modal/member/AddMemberModal";

/**
 * TODO
 * 1. 회원추가 -> 이메일, 휴대폰번호, 주소/상세주소, 입회일자 쪼개기 -> 일단 주소만...
 * 2. 회원 삭제
 * 3. 엑셀 다운로드
 * 4. 엑셀 업로드
 */
const Member = () => {
  const dispatch = useDispatch()
  const memberList = useSelector(state => state.member.memberList)
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState(null)
  const [memberNo, setMemberNo] = useState(null)

  const columns = [
    { field: 'id', headerName: 'No', width: 80, headerAlign: 'center', align: 'center'},
    { field: 'memberNm', headerName: 'Name', flex: 1, cellClassName: `${Const.DATA_GRID_CELL_CLASS_NAME.GREEN_COLOR} ${Const.DATA_GRID_CELL_CLASS_NAME.CURSOR_POINTER}`},
    { field: 'email', headerName: 'Email', flex: 1},
    { field: 'mobileNo', headerName: 'Mobile Number', flex: 1},
    { field: 'age', headerName: 'Age', flex: 1, valueGetter: (params) => getAgeFromBirthday(params.row.birthday)},
    { field: 'address', headerName: 'Address', flex: 1, valueGetter: (params) => isNotBlank(params.row.address) ? isNotBlank(params.row.addressDtl) ? params.row.address + ' ' + params.row.addressDtl : params.row.address : null},
    { field: 'joinDt', headerName: 'Join Date', flex: 1, valueGetter: (params) => StringToDateHyphen(params.row.joinDt)}
  ]

  const handleAdd = () => {
    setOpen(true)
    setAction(Const.BUTTONS_ADD)
  }

  const handleSearch = () => {
    dispatch(getMemberList())
  }

  const handleCallback = () => {
    handleSearch()
  }

  const buttonProps = {
    [Const.BUTTONS_ADD]: {
      [Const.BUTTON_PROPS_DISABLED]: false,
      [Const.BUTTON_PROPS_ON_CLICK]: handleAdd
    },
    [Const.BUTTONS_SEARCH]: {
      [Const.BUTTON_PROPS_DISABLED]: false,
      [Const.BUTTON_PROPS_ON_CLICK]: handleSearch
    }
  }

  const handleCellClick = async (params, event) => {
    if (params.field === 'memberNm') {
      await dispatch(getMember(params.row.memberNo))
      setAction(Const.BUTTONS_EDIT)
      setMemberNo(params.row.memberNo)
      setOpen(true)
    }
  }

  useEffect(() => {
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
      <AddMemberModal action={action} memberNo={memberNo} open={open} setOpen={setOpen} handleCallback={handleCallback} />
    </Box>
  )
}

export default Member