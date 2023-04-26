import ContentHeader from "../../../../components/content/ContentHeader";
import CustomGrid from "../../../../components/grid";
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {
  BUTTON_PROPS_DISABLED,
  BUTTON_PROPS_ON_CLICK,
  BUTTONS_ADD, BUTTONS_EDIT, BUTTONS_SEARCH,
  DATA_GRID_CELL_CLASS_NAME, STATUS_SUCCESS
} from "../../../../utils/const";
import {getAuthority, getAuthorityList, resetAuthorityList} from "../../../../redux/system/authority";
import * as Apis from "../../../../apis";
import {makeSnackbarMessage} from "../../../../utils/util";
import AuthorityDetailModal from "../../../../components/modal/system/authority/AuthorityDetailModal";

const Authority = () => {
  const dispatch = useDispatch()
  const authorityList = useSelector(state => state.system.authority.authorityList)
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState(null)
  const [selectionModel, setSelectionModel] = useState([])
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const columns = [
    { field: 'id', headerName: '권한번호', flex: 1},
    { field: 'name', headerName: '권한명', flex: 1, cellClassName: `${DATA_GRID_CELL_CLASS_NAME.GREEN_COLOR} ${DATA_GRID_CELL_CLASS_NAME.CURSOR_POINTER}`},
    { field: 'displayName', headerName: '권한전시명', flex: 1},
  ]

  const handleAdd = () => {
    setOpen(true)
    setAction(BUTTONS_ADD)
  }

  const handleSearch = () => {
    setSelectionModel([])
    dispatch(getAuthorityList())
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
  }

  const handleCellClick = async (params, event) => {
    if (params.field === 'name') {
      await dispatch(getAuthority(params.row.id))
      setAction(BUTTONS_EDIT)
      setOpen(true)
    }
  }

  const handleDelete = async () => {
    const count = selectionModel.length
    if (window.confirm("선택한 " + count + "개의 권한을 삭제하시겠습니까?")) {
      const { status, message } = await Apis.system.authority.deleteAuthorities(selectionModel)
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
    return () => {
      dispatch(resetAuthorityList())
    }
  }, [])

  return (
    <Box m="20px">
      <ContentHeader title='권한 관리' subTitle="권한 관리" buttonProps={buttonProps} />
      <CustomGrid
        rows={authorityList}
        columns={columns}
        onCellClick={handleCellClick}
        checkboxSelection={true}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
        handleDelete={handleDelete}
      >
      </CustomGrid>
      <AuthorityDetailModal action={action} open={open} setOpen={setOpen} handleCallback={handleSearch} />
    </Box>
  )
}

export default Authority
