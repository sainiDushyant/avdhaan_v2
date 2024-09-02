import { createSlice } from "@reduxjs/toolkit";


const initialState = {};

const hes = createSlice({
  name: "hes",
  initialState,
  reducers: {},
});

export const hesActions = hes.actions
export default hes.reducer;
