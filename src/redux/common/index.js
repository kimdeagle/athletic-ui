import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openExcelUploadModal: false,
  excelUploadModalProps: {}
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setOpenExcelUploadModal: (state, action) => {
      state.openExcelUploadModal = action.payload
    },
    setExcelUploadModalProps: (state, action) => {
      state.excelUploadModalProps = action.payload
    },
    resetExcelUploadModalProps: (state) => {
      state.excelUploadModalProps = {}
    }
  }
})

export const { setOpenExcelUploadModal, setExcelUploadModalProps, resetExcelUploadModalProps } = commonSlice.actions

export default  commonSlice.reducer