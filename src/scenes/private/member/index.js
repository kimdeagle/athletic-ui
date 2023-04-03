import ContentHeader from "../../../components/content/ContentHeader";
import {Box} from "@mui/material";
import {getAgeFromBirthday, makeSnackbarMessage, sleep} from "../../../utils/util";
import CustomGrid from "../../../components/grid";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMember, getMemberList, resetMemberList} from "../../../redux/member";
import AddMemberModal from "../../../components/modal/member/AddMemberModal";
import {
  BUTTON_PROPS_DISABLED,
  BUTTON_PROPS_ON_CLICK, BUTTON_PROPS_PARAMETERS,
  BUTTONS_ADD, BUTTONS_EDIT, BUTTONS_EXCEL_DOWNLOAD, BUTTONS_EXCEL_UPLOAD, BUTTONS_SEARCH,
  DATA_GRID_CELL_CLASS_NAME, DEFAULT_SLEEP_MS
} from "../../../utils/const";
import * as Apis from "../../../apis";
import {useSnackbar} from "notistack";

const Member = () => {
  const dispatch = useDispatch()
  const memberList = useSelector(state => state.member.memberList)
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState(null)
  const [selectionModel, setSelectionModel] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  const columns = [
    { field: 'name', headerName: '회원명', flex: 1, cellClassName: `${DATA_GRID_CELL_CLASS_NAME.GREEN_COLOR} ${DATA_GRID_CELL_CLASS_NAME.CURSOR_POINTER}`},
    { field: 'email', headerName: '이메일', flex: 1},
    { field: 'mobileNo', headerName: '휴대폰 번호', flex: 1},
    { field: 'age', headerName: '나이', flex: 1, valueGetter: (params) => getAgeFromBirthday(params.row.birthday)},
    { field: 'address', headerName: '주소', flex: 1},
    { field: 'joinDt', headerName: '입회일자', flex: 1}
  ]

  const handleAdd = () => {
    setOpen(true)
    setAction(BUTTONS_ADD)
  }

  const handleSearch = () => {
    dispatch(getMemberList())
  }

  const excelUploadParams = {
    sampleUrl: '/excel/member/uploadMemberSample.xlsx',
    uploadUrl: '/member/excel',
    callback: handleSearch
  }

  const excelDownloadParams = {
    length: memberList.length,
    downloadUrl: '/member/excel',
  }

  const buttonProps = {
    [BUTTONS_EXCEL_UPLOAD]: {
      [BUTTON_PROPS_DISABLED]: false,
      [BUTTON_PROPS_PARAMETERS]: excelUploadParams
    },
    [BUTTONS_EXCEL_DOWNLOAD]: {
      [BUTTON_PROPS_DISABLED]: false,
      [BUTTON_PROPS_PARAMETERS]: excelDownloadParams
    },
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
      await dispatch(getMember(params.row.id))
      setAction(BUTTONS_EDIT)
      setOpen(true)
    }
  }

  const handleDelete = async () => {
    const count = selectionModel.length
    if (window.confirm("선택한 " + count + "명의 회원을 삭제하시겠습니까?")) {
      try {
        const response = await Apis.member.deleteMembers(selectionModel)
        if (response.code === 200) {
          setSelectionModel([])
          enqueueSnackbar(makeSnackbarMessage(response.message), {
            variant: 'success',
          })
          handleSearch()
        }
      } catch (e) {
        enqueueSnackbar(makeSnackbarMessage(e.response.data.message), { variant: 'error' })
      }
      await sleep(DEFAULT_SLEEP_MS)
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetMemberList())
    }
  }, [])

  return (
    <Box m="20px">
      <ContentHeader title='회원 관리' subTitle="회원 관리" buttonProps={buttonProps} />
      <CustomGrid
        rows={memberList}
        columns={columns}
        onCellClick={handleCellClick}
        checkboxSelection={true}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
        handleDelete={handleDelete}
      >
      </CustomGrid>
      <AddMemberModal action={action} open={open} setOpen={setOpen} handleCallback={handleSearch} />
    </Box>
  )
}

export default Member