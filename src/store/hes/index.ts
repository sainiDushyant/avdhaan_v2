import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  mainFilterLoading: false,
};

const hes = createSlice({
  name: "hes",
  initialState,
  reducers: {
    setMainFilterLoading(state, action: PayloadAction<boolean>) {
      state.mainFilterLoading = action.payload
    }
  },
});

export const { 
  setMainFilterLoading, 
} = hes.actions
export default hes.reducer;
