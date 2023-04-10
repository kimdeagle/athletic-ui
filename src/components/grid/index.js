import {DataGrid, koKR} from "@mui/x-data-grid";
import {Box, Button, styled, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {DATA_GRID_CELL_CLASS_NAME} from "../../utils/const";

const CustomGrid = ({rows, columns, onCellClick, selectionModel, setSelectionModel, checkboxSelection, getRowId, handleDelete}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const headerAlignColumns = [...columns]

  headerAlignColumns.forEach(column => {
    column.align = column.align ? column.align : 'center'
    column.headerAlign = column.headerAlign ? column.headerAlign : 'center'
  })

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
    <Box>
      <Box
        display='flex'
        justifyContent='start'
        alignItems='center'
      >
        {handleDelete &&
          <Button
            variant="contained"
            color="error"
            disabled={!selectionModel.length}
            onClick={handleDelete}
          >
            선택삭제
          </Button>
        }
      </Box>
      <CustomBox
        mt={1}
        height='75vh'
      >
        <DataGrid
          localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={headerAlignColumns}
          onCellClick={onCellClick}
          disableColumnMenu={true}
          disableSelectionOnClick={true}
          checkboxSelection={checkboxSelection}
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(newSelectionModel) => {setSelectionModel(newSelectionModel)}}
          getRowId={(row) => row.id}
        />
      </CustomBox>
    </Box>
  )
}

export default CustomGrid