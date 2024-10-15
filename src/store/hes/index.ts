import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type deviceIdentifiers = string[];

const initialState = {
  mainFilterLoading: false,
  deviceIdentifiers: [] as deviceIdentifiers
};

const hes = createSlice({
  name: 'hes',
  initialState,
  reducers: {
    setMainFilterLoading(state, action: PayloadAction<boolean>) {
      state.mainFilterLoading = action.payload;
    },
    setDeviceIdentifiers(state, action: PayloadAction<string[]>) {
      state.deviceIdentifiers = action.payload;
    }
  }
});

export const { setMainFilterLoading, setDeviceIdentifiers } = hes.actions;
export default hes.reducer;
