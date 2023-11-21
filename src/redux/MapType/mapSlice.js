import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    mapType: 'standard', // Додайте тип карти за замовчуванням
  },
  reducers: {
    changeMapType: (state, { payload }) => {
      state.mapType = payload;
    },
  },
});
export const { changeMapType } = mapSlice.actions;
