import {configureStore} from "@reduxjs/toolkit";

import {tableSlice} from "@/redux/features/slices";

export const store = configureStore({
  reducer: {
    [tableSlice.name]: tableSlice.reducer,
  },
  devTools: true,
});