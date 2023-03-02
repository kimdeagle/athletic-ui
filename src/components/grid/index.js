import {DataGrid} from "@mui/x-data-grid";
import {Box, styled, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {DATA_GRID_CELL_CLASS_NAME} from "../../utils/const";

const CustomGrid = ({rows, columns, onCellClick, selectionModel, setSelectionModel, checkboxSelection, getRowId}) => {
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
      background-color: ${theme.palette.mode === 'light' ? colors.grey[900] : colors.grey[800]};
    }
    & .MuiDataGrid-footerContainer {
      border-top: none;
      background-color: ${colors.blueAccent[800]};
    }
    & .${DATA_GRID_CELL_CLASS_NAME.GREEN_COLOR} {
      color: ${colors.greenAccent[500]};
    }
    & .${DATA_GRID_CELL_CLASS_NAME.CURSOR_POINTER}:hover {
      cursor: pointer;
    }
  `
  return (
    <CustomBox
      mt={1}
      height='75vh'
    >
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={onCellClick}
        disableColumnMenu={true}
        disableSelectionOnClick={true}
        checkboxSelection={checkboxSelection}
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) => {setSelectionModel(newSelectionModel)}}
        getRowId={getRowId}
      />
    </CustomBox>
  )
}

export default CustomGrid