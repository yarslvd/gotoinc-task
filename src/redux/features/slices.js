import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  data: [],
  sortField: '',
  order: 'asc',
  currData: null
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    setSortField: (state, action) => {
      state.sortField = action.payload
    },
    setOrder: (state, action) => {
      state.order = action.payload
    },
    setCurrData : (state, action) => {
      state.currData = action.payload;
    }
  }
});

export const {
  setData,
  setSortField,
  setOrder,
  setCurrData
} = tableSlice.actions;
export const selectData = (state) => state.data.data;
export default tableSlice.reducer;