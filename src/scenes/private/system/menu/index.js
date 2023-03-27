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
import {getAuthorityList} from "../../../../redux/authority";

const Menu = () => {
  const [selected, setSelected] = useState(ROOT_MENU.id)
  const [entireMenuList, setEntireMenuList] = useState([])
  const [processedRootMenu, setProcessedRootMenu] = useState({})

  const dispatch = useDispatch()

  const menuList = useSelector(state => state.menu.menuList)

  const { enqueueSnackbar } = useSnackbar()

  const validationSchema = Yup.object().shape({
    name: Yup.string()
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
  const handleSubmit = async (values, {setValues}) => {
    if (window.confirm(selected === NEW_MENU.id ? '등록하시겠습니까?' : '수정하시겠습니까?')) {
      const parentMenuId = entireMenuList.find(menu => menu.id === selected).upMenuId
      const parentMenu = entireMenuList.find(menu => menu.id === parentMenuId)
      try {
        const params = {...values, ...(selected === NEW_MENU.id ? {id: null} : null)}
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
      setProcessedRootMenu({...ROOT_MENU, children: getProcessedMenuList(menuList)})
      setSelected(isEmptyObject(parentMenuId) ? ROOT_MENU.id : parentMenuId)
      setValues(isEmptyObject(parentMenu) ? ROOT_MENU : parentMenu)
    }
  }

  /* 메뉴 삭제 */
  const handleDelete = async (setSubmitting, setValues) => {
    setSubmitting(true)
    const childMenu = entireMenuList.filter(menu => menu.upMenuId === selected)
    const confirmMessage = childMenu.length ? "하위 메뉴들도 같이 삭제됩니다.\n삭제하시겠습니까?" : "메뉴를 삭제하시겠습니까?"
    if (window.confirm(confirmMessage)) {
        const parentMenuId = entireMenuList.find(menu => menu.id === selected).upMenuId
        const parentMenu = entireMenuList.find(menu => menu.id === parentMenuId)
      if (selected === NEW_MENU.id) {
        deleteAlreadyAddMenu()
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
      setProcessedRootMenu({...ROOT_MENU, children: getProcessedMenuList(menuList)})
      setSelected(isEmptyObject(parentMenuId) ? ROOT_MENU.id : parentMenuId)
      setValues(isEmptyObject(parentMenu) ? ROOT_MENU : parentMenu)
    }
    setSubmitting(false)
  }

  /* 기존 추가 메뉴 삭제 */
  const deleteAlreadyAddMenu = () => {
    setEntireMenuList([ROOT_MENU, ...menuList])
  }

  /* 메뉴 등록/수정/삭제 성공 핸들러 */
  const handleSuccess = () => {
    dispatch(getMenuList())
    dispatch(getUseMenuList())
  }

  useEffect(() => {
    dispatch(getMenuList())
    dispatch(getAuthorityList())
  }, [])

  return (
    <Box m="20px">
      <ContentHeader title='메뉴 관리' subTitle='메뉴 관리' hideButtons={true} />
      <Formik initialValues={ROOT_MENU} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({setSubmitting, setValues}) => (
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
            />
            <MenuDetail
              selected={selected}
              handleDelete={() => handleDelete(setSubmitting, setValues)}
            />
          </Box>
        )}
      </Formik>
    </Box>
  )
}

export default Menu