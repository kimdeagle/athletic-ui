import ContentHeader from "../../../../components/content/ContentHeader";
import { Box } from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {getProcessedMenuList, isEmptyObject, makeSnackbarMessage, sleep} from "../../../../utils/util";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Apis from "../../../../apis";
import {getMenuList, getUseMenuList} from "../../../../redux/menu";
import {DEFAULT_SLEEP_MS, NEW_MENU, ROOT_MENU, VALIDATION_SCHEMA} from "../../../../utils/const";
import MenuTree from "./MenuTree";
import MenuDetail from "./MenuDetail";
import {getAuthorityList, getAuthorityMenuList} from "../../../../redux/authority";

const Menu = () => {
  const [selected, setSelected] = useState(ROOT_MENU.menuNo)
  const [entireMenuList, setEntireMenuList] = useState([])
  const [processedRootMenu, setProcessedRootMenu] = useState({})

  const dispatch = useDispatch()

  const menuList = useSelector(state => state.menu.menuList)

  const { enqueueSnackbar } = useSnackbar()

  const validationSchema = Yup.object().shape({
    menuNm: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    menuUrl: Yup.string()
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage),
    sortSeq: Yup.number()
      .typeError(VALIDATION_SCHEMA.COMMON.numberTypeErrorMessage)
      .required(VALIDATION_SCHEMA.COMMON.requiredMessage)
      .min(VALIDATION_SCHEMA.SORT_SEQ.MIN.limit, VALIDATION_SCHEMA.SORT_SEQ.MIN.message)
      .max(VALIDATION_SCHEMA.SORT_SEQ.MAX.limit, VALIDATION_SCHEMA.SORT_SEQ.MAX.message),
  })

  /* 메뉴 등록/수정 */
  const handleSubmit = async (values) => {
    if (window.confirm(selected === NEW_MENU.menuNo ? '등록하시겠습니까?' : '수정하시겠습니까?')) {
      try {
        const params = {...values, ...(selected === NEW_MENU.menuNo ? {menuNo: null} : null)}
        const response = await Apis.menu.saveMenu(params)
        if (response.code === 200) {
          enqueueSnackbar(makeSnackbarMessage(response.message), {
            variant: 'success',
            onExit: handleSuccess
          })
        }
      } catch (e) {
        enqueueSnackbar(makeSnackbarMessage(e.response.data.message), { variant: 'error' })
      }
      await sleep(DEFAULT_SLEEP_MS)
    }
  }

  /* 메뉴 삭제 */
  const handleDelete = async (setSubmitting, setValues) => {
    setSubmitting(true)
    const childMenu = entireMenuList.filter(menu => menu.upMenuNo === selected)
    const confirmMessage = childMenu.length ? "하위 메뉴들도 같이 삭제됩니다.\n삭제하시겠습니까?" : "메뉴를 삭제하시겠습니까?"
    if (window.confirm(confirmMessage)) {
      if (selected === NEW_MENU.menuNo) {
        const parentMenuNo = entireMenuList.find(menu => menu.menuNo === selected).upMenuNo
        const parentMenu = entireMenuList.find(menu => menu.menuNo === parentMenuNo)
        deleteAlreadyAddMenu()
        setProcessedRootMenu({...ROOT_MENU, children: getProcessedMenuList(menuList)})
        setSelected(isEmptyObject(parentMenuNo) ? ROOT_MENU.menuNo : parentMenuNo)
        setValues(isEmptyObject(parentMenu) ? ROOT_MENU : parentMenu)
      } else {
        try {
          const response = await Apis.menu.deleteMenu(selected)
          if (response.code === 200) {
            enqueueSnackbar(makeSnackbarMessage(response.message), {
              variant: 'success',
              onExit: handleSuccess
            })
          }
        } catch (e) {
          enqueueSnackbar(makeSnackbarMessage(e.response.data.message), { variant: 'error' })
        }
        await sleep(DEFAULT_SLEEP_MS)
      }
    }
    setSubmitting(false)
  }

  /* 기존 추가 메뉴 삭제 */
  const deleteAlreadyAddMenu = () => {
    setEntireMenuList([ROOT_MENU, ...menuList])
  }

  /* 메뉴 등록/수정/삭제 성공 핸들러 */
  const handleSuccess = () => {
    dispatch(getUseMenuList())
    setTimeout(() => window.location.reload(), 100)
  }

  useEffect(() => {
    dispatch(getMenuList())
    dispatch(getAuthorityList())
    dispatch(getAuthorityMenuList())
  }, [])

  return (
    <Box m="20px">
      <ContentHeader title='메뉴 관리' hideButtons={true} />
      <Formik initialValues={ROOT_MENU} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({isSubmitting, setSubmitting, values, setValues}) => (
          <Box
            display='flex'
            justifyContent='center'
          >
            <MenuTree
              selected={selected}
              setSelected={setSelected}
              entireMenuList={entireMenuList}
              setEntireMenuList={setEntireMenuList}
              processedRootMenu={processedRootMenu}
              setProcessedRootMenu={setProcessedRootMenu}
              deleteAlreadyAddMenu={deleteAlreadyAddMenu}
              isSubmitting={isSubmitting}
              setValues={setValues}
            />
            <MenuDetail
              selected={selected}
              values={values}
              isSubmitting={isSubmitting}
              setSubmitting={setSubmitting}
              handleDelete={() => handleDelete(setSubmitting, setValues)}
            />
          </Box>
        )}
      </Formik>
    </Box>
  )
}

export default Menu