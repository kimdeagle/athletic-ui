import {Box} from "@mui/material";
import ContentHeader from "../../../../components/content/ContentHeader";
import CustomGrid from "../../../../components/grid";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {
  BUTTON_PROPS_DISABLED,
  BUTTON_PROPS_ON_CLICK, BUTTON_PROPS_PARAMETERS,
  BUTTONS_ADD, BUTTONS_EDIT, BUTTONS_EXCEL_DOWNLOAD, BUTTONS_SEARCH, COMMON_CODE,
  DATA_GRID_CELL_CLASS_NAME, STATUS_SUCCESS
} from "../../../../utils/const";
import {getAdmin, getAdminList, resetAdminList} from "../../../../redux/system/admin";
import * as Apis from "../../../../apis";
import {makeSnackbarMessage} from "../../../../utils/util";
import {getCodeListByGroupCodes, resetCodeList} from "../../../../redux/code";
import AdminDetailModal from "../../../../components/modal/system/admin/AdminDetailModal";
import {getAuthorityList, resetAuthorityList} from "../../../../redux/system/authority";

const groupCodes = [COMMON_CODE.APPROVE_STATUS]

const Admin = () => {
  const dispatch = useDispatch()
  const adminList = useSelector(state => state.system.admin.adminList)
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState(null)
  const [selectionModel, setSelectionModel] = useState([])
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const columns = [
    { field: 'id', headerName: '관리자번호', flex: 1},
    { field: 'name', headerName: '관리자명', flex: 1, cellClassName: `${DATA_GRID_CELL_CLASS_NAME.GREEN_COLOR} ${DATA_GRID_CELL_CLASS_NAME.CURSOR_POINTER}`},
    { field: 'loginId', headerName: '로그인ID', flex: 1},
    { field: 'email', headerName: '이메일', flex: 1},
    { field: 'mobileNo', headerName: '휴대폰 번호', flex: 1},
    { field: 'authorityId', headerName: '권한번호', flex: 1},
    { field: 'authorityDisplayName', headerName: '권한전시명', flex: 1},
    { field: 'approveStatusName', headerName: '승인상태명', flex: 1},
  ]

  const handleAdd = () => {
    setOpen(true)
    setAction(BUTTONS_ADD)
  }

  const handleSearch = () => {
    setSelectionModel([])
    dispatch(getAdminList())
  }

  const buttonProps = {
    [BUTTONS_ADD]: {
      [BUTTON_PROPS_DISABLED]: false,
      [BUTTON_PROPS_ON_CLICK]: handleAdd
    },
    [BUTTONS_SEARCH]: {
      [BUTTON_PROPS_DISABLED]: false,
      [BUTTON_PROPS_ON_CLICK]: handleSearch
    },
    [BUTTONS_EXCEL_DOWNLOAD]: {
      [BUTTON_PROPS_DISABLED]: false,
      [BUTTON_PROPS_PARAMETERS]: {
        downloadUrl: '/admin/excel/download',
      }
    }
  }

  const handleCellClick = async (params, event) => {
    if (params.field === 'name') {
      await dispatch(getAdmin(params.row.id))
      setAction(BUTTONS_EDIT)
      setOpen(true)
    }
  }

  const handleDelete = async () => {
    const count = selectionModel.length
    if (window.confirm("선택한 " + count + "명의 관리자를 삭제하시겠습니까?")) {
      const { status, message } = await Apis.system.admin.deleteAdmins(selectionModel)
      if (status === STATUS_SUCCESS) {
        enqueueSnackbar(makeSnackbarMessage(message), { variant: 'success' })
        handleSearch()
      } else {
        enqueueSnackbar(makeSnackbarMessage(message), {
          variant: 'error',
          persist: true,
          onEnter: () => window.addEventListener('mousedown', () => closeSnackbar()),
          onExit: () => window.removeEventListener('mousedown', () => closeSnackbar()),
        })
      }
    }
  }

  useEffect(() => {
    dispatch(getCodeListByGroupCodes({groupCodes}))
    dispatch(getAuthorityList())
    return () => {
      dispatch(resetCodeList())
      dispatch(resetAuthorityList())
      dispatch(resetAdminList())
    }
  }, [])

  return (
    <Box m='20px'>
      <ContentHeader title='관리자 관리' subTitle="관리자 관리" buttonProps={buttonProps} />
      <CustomGrid
        rows={adminList}
        columns={columns}
        onCellClick={handleCellClick}
        checkboxSelection={true}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
        handleDelete={handleDelete}
      />
      <AdminDetailModal action={action} open={open} setOpen={setOpen} handleCallback={handleSearch} />
    </Box>
  )
}

export default Admin