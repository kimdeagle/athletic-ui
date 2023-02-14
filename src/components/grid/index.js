import {DataGrid} from "@mui/x-data-grid";
import {Box, styled, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import * as Const from "../../utils/const";

const CustomGrid = ({rows, columns, onCellClick, disableColumnMenu}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const CustomBox = styled(Box)`
    & .MuiDataGrid-root {
      border: none;
      font-size: 14px;
    }
    & .MuiDataGrid-root .MuiDataGrid-cell {
      border: none;
    }
    & .MuiDataGrid-columnHeaders {
      background-color: ${colors.blueAccent[800]};
      border-bottom: none;
    }
    & .MuiDataGrid-columnHeaderTitle {
      font-weight: bold;
    }
    & .MuiDataGrid-virtualScroller {
      background-color: ${colors.primary[400]};
    }
    & .MuiDataGrid-footerContainer {
      border-top: none;
      background-color: ${colors.blueAccent[800]};
    }
    & .${Const.DATA_GRID_CELL_CLASS_NAME.GREEN_COLOR} {
      color: ${colors.greenAccent[300]}
    }
    & .${Const.DATA_GRID_CELL_CLASS_NAME.CURSOR_POINTER}:hover {
      cursor: pointer;
    }
  `
  return (
    <CustomBox
      m='40px 0 0 0'
      height='75vh'
    >
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={onCellClick}
        disableColumnMenu={disableColumnMenu}
      />
    </CustomBox>
  )
}

export default CustomGrid