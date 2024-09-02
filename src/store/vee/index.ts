import { createSlice } from "@reduxjs/toolkit";


const initialState = {};

const vee = createSlice({
  name: "vee",
  initialState,
  reducers: {},
});

export const veeActions = vee.actions
export default vee.reducer;
