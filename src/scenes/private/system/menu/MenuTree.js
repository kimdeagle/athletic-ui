import {Box, Button, Typography, useTheme} from "@mui/material";
import {TreeItem, TreeView} from "@mui/lab";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import {getProcessedMenuList, isEmptyObject, makeSnackbarMessage} from "../../../../utils/util";
import {tokens} from "../../../../theme";
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {useSelector} from "react-redux";
import {NEW_MENU, ROOT_MENU} from "../../../../utils/const";
import {useFormikContext} from "formik";

const MenuTree = ({selected, setSelected, entireMenuList, setEntireMenuList, processedRootMenu, setProcessedRootMenu, deleteAlreadyAddMenu}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const menuList = useSelector(state => state.menu.menuList)

  const [expanded, setExpanded] = useState([ROOT_MENU.id])

  const { setValues, isSubmitting } = useFormikContext()

  const { enqueueSnackbar } = useSnackbar()

  /* 모두 펼치기 */
  const handleExpandClick = () => {
    setExpanded(entireMenuList.map(menu => menu.id))
  }

  /* 모두 숨기기 */
  const handleCollapseClick = () => {
    setExpanded([])
    setSelected(ROOT_MENU.id)
    setValues(ROOT_MENU)
  }

  /* 추가 버튼 클릭 */
  const handleAddClick = () => {
    const selectedMenu = entireMenuList.find(menu => menu.id === selected)
    if (selectedMenu.menuLevel === 2) {
      enqueueSnackbar(makeSnackbarMessage('현재 2depth에 메뉴를 추가할 수 없습니다.\n추후 변경 예정입니다.'), { variant: 'error' })
      return;
    }

    const alreadyAddMenu = entireMenuList.find(menu => menu.id === NEW_MENU.id)
    if (isEmptyObject(alreadyAddMenu)) {
      addNewMenu()
    } else {
      if (window.confirm("작업중인 추가 메뉴가 있습니다.\n삭제하고 새로 추가하시겠습니까?")) {
        deleteAlreadyAddMenu()
        addNewMenu()
      }
    }
  }

  /* 새 메뉴 추가 */
  const addNewMenu = () => {
    const selectedMenu = entireMenuList.find(menu => menu.id === selected)
    const addMenu = {
      ...NEW_MENU,
      upMenuId: selected !== ROOT_MENU.id ? selectedMenu.id : null,
      upMenuName: selected !== ROOT_MENU.id ? selectedMenu.name : null,
      menuUrl: selectedMenu.menuUrl + NEW_MENU.menuUrl,
      menuLevel: selectedMenu.menuLevel + 1
    }
    const childrenList = [...menuList, addMenu]
    setEntireMenuList([ROOT_MENU, ...childrenList])
    setProcessedRootMenu({...ROOT_MENU, children: getProcessedMenuList(childrenList)})
    setExpanded([...expanded, selectedMenu.id])
    setSelected(NEW_MENU.id)
    setValues(addMenu)
  }

  /* 메뉴 선택 */
  const handleSelect = (event, nodeId) => {
    if (nodeId !== selected) {
      if (selected === NEW_MENU.id) {
        if (window.confirm("작업중인 추가 메뉴가 있습니다.\n삭제하고 이동하시겠습니까?")) {
          deleteAlreadyAddMenu()
          setProcessedRootMenu({...ROOT_MENU, children: getProcessedMenuList(menuList)})
        } else {
          return;
        }
      }
      setSelected(nodeId)
      setValues(entireMenuList.find(menu => menu.id === nodeId))
    }
  }

  /* 메뉴 토글 */
  const handleToggle = (event, nodeIds) => {
    if (selected !== NEW_MENU.id)
      setExpanded(nodeIds)
  }

  /* 메뉴 렌더링 */
  const renderMenu = () => (
    <TreeItem nodeId={processedRootMenu.id} label={processedRootMenu.name}>
      {processedRootMenu.children ? renderChildren(processedRootMenu.children) : null}
    </TreeItem>
  )

  const renderChildren = (children) => (
    children.map(child => (
      <TreeItem key={child.id} nodeId={child.id} label={child.name}>
        {child.children ? renderChildren(child.children) : null}
      </TreeItem>
    ))
  )

  useEffect(() => {
    setEntireMenuList([ROOT_MENU, ...menuList])
    setProcessedRootMenu({...ROOT_MENU, children: getProcessedMenuList(menuList)})
  }, [menuList])

  return (
    <Box width='25%' mr={5}>
      <Typography variant='h4' mb={2}>
        메뉴 리스트
      </Typography>
      <Box
        minHeight={500}
        bgcolor={colors.grey[900]}
        p={1}
      >
        <Box
          display='flex'
          justifyContent='space-between'
        >
          <Box mb={1}>
            <Button
              variant='outlined'
              size='small'
              color='primary'
              onClick={handleExpandClick}
              disabled={isSubmitting}
            >
              모두 펼치기
            </Button>
            <Button
              variant='outlined'
              size='small'
              color='warning'
              sx={{ ml: 1 }}
              onClick={handleCollapseClick}
              disabled={isSubmitting}
            >
              모두 숨기기
            </Button>
          </Box>
          <Box>
            <Button
              variant='contained'
              size='small'
              color='success'
              onClick={handleAddClick}
              disabled={isSubmitting}
            >
              추가
            </Button>
          </Box>
        </Box>
        <hr color={colors.grey[500]} />
        <TreeView
          defaultCollapseIcon={<ExpandMoreOutlinedIcon />}
          defaultExpandIcon={<ChevronRightOutlinedIcon />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
        >
          {!isEmptyObject(processedRootMenu) && renderMenu()}
        </TreeView>
      </Box>
    </Box>
  )
}

export default MenuTree