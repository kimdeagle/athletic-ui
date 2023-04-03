import {Box, Button, styled, Typography, useTheme} from "@mui/material";
import {TreeItem, TreeView, useTreeItem} from "@mui/lab";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import {getProcessedMenuList, isEmptyObject, makeSnackbarMessage} from "../../../../utils/util";
import {tokens} from "../../../../theme";
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {useSelector} from "react-redux";
import {NEW_MENU, ROOT_MENU} from "../../../../utils/const";
import {useFormikContext} from "formik";
import PropTypes from "prop-types";
import * as Icons from "@mui/icons-material";
import React from "react";
import clsx from "clsx";

const CustomContentRoot = styled('div')(({ theme }) => ({
  /*
  * root: "MuiTreeItem-content" (based)
  * selected: "Mui-selected"
  * expanded: "Mui-expanded"
  * focused: "Mui-focused"
  * iconContainer: "MuiTreeItem-iconContainer"
  * label: "MuiTreeItem-label"
  * */

  cursor: 'default !important',
  '&:hover': {
    backgroundColor: 'transparent !important',
  },
  '&.Mui-focused, &.Mui-selected.Mui-focused': {
    backgroundColor: 'transparent !important',
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent !important',
    '& .MuiTreeItem-label': {
      backgroundColor: theme.palette.action.selected,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      '&:hover': {
        backgroundColor: theme.palette.action.selected,
      },
      '& .MuiTypography-root': {
        fontWeight: theme.typography.fontWeightBold
      },
    },
  },
  '& .MuiTreeItem-label': {
    display: 'flex',
    alignItems: 'center',
    padding: '5px !important',
    cursor: 'pointer !important',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      '& .MuiTypography-root': {
        fontWeight: theme.typography.fontWeightBold
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: '18px !important',
      color: theme.palette.mode === 'dark' ? '#59d0ff' : '#0098e5',
      marginRight: '8px !important',
    },
    '& .MuiTypography-root': {
      fontSize: '14px !important',
    },
  },
}))

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    className,
    classes,
    label,
    nodeId,
    icon,
    expansionIcon,
  } = props

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId)

  const handleMouseDown = (event) => {
    preventSelection(event)
  }

  const handleExpansionClick = (event) => {
    handleExpansion(event)
  }

  const handleSelectionClick = (event) => {
    handleSelection(event)
  }

  const LabelIcon = isEmptyObject(icon) ? null : Icons[icon]

  return (
      <CustomContentRoot
        className={clsx(className, classes.root, {
          'Mui-expanded': expanded,
          'Mui-selected': selected,
          'Mui-focused': focused,
          'Mui-disabled': disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref}
      >
        {/* expansion icon area */}
        <Box
          className={classes.iconContainer}
          sx={{ cursor: expansionIcon ? 'pointer' : 'inherit' }}
          onClick={handleExpansionClick}
        >
          {expansionIcon}
        </Box>
        {/* label area */}
        <Box
          className={classes.label}
          onClick={handleSelectionClick}
          ml={LabelIcon ? 'inherit' : '26px'}
        >
          {LabelIcon && <Box component={LabelIcon} />}
          <Typography>{label}</Typography>
        </Box>
      </CustomContentRoot>
    )
})

CustomContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  icon: PropTypes.node,
  expansionIcon: PropTypes.node,
  label: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired
}

const MenuTree = ({selected, setSelected, entireMenuList, setEntireMenuList, processedRootMenu, setProcessedRootMenu, deleteAlreadyAddMenu}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const menuList = useSelector(state => state.system.menu.menuList)

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
    <TreeItem ContentComponent={CustomContent} nodeId={processedRootMenu.id} icon={'ClearAllOutlined'} label={processedRootMenu.name}>
      {processedRootMenu.children ? renderChildren(processedRootMenu.children) : null}
    </TreeItem>
  )

  const renderChildren = (children) => (
    children.map(child => {
      return (
        <TreeItem ContentComponent={CustomContent} key={child.id} nodeId={child.id} icon={child.iconNm} label={child.name}>
        {child.children ? renderChildren(child.children) : null}
      </TreeItem>
      )
    })
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