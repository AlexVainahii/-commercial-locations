import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    active: false,
    minPrice: 0,
    maxPrice: 0,
    minArea: 0,
    maxArea: 0,
    radius: 0,
    address: '',
    name: '',
  },
  reducers: {
    changeFilter: (state, { payload }) => {
      return (state = payload);
    },
  },
});
export const { changeFilter } = filterSlice.actions;
