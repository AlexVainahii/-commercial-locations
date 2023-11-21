import { createSlice } from '@reduxjs/toolkit';
import {
  updateCommerce,
  addCommerce,
  deleteCommerce,
  fetchCommerce,
} from './operationsCommercial';
import {
  createStatus,
  onFulfilledAdd,
  onFulfilledDelete,
  onFulfilledFetch,
  onFulfilled,
  onPending,
  onRejected,
  onFulfilledUpdate,
} from './helpFunctionCommercial';
const commercialInitialState = {
  commerces: [],
  isLoading: false,
  error: null,
};
const STATUSES = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};
export const commercialSlice = createSlice({
  name: 'commerces',
  initialState: commercialInitialState,
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUSES;
    builder
      .addCase(fetchCommerce.fulfilled, onFulfilledFetch)
      .addCase(addCommerce.fulfilled, onFulfilledAdd)
      .addCase(deleteCommerce.fulfilled, onFulfilledDelete)
      .addCase(updateCommerce.fulfilled, onFulfilledUpdate)
      .addMatcher(createStatus(PENDING), onPending)
      .addMatcher(createStatus(REJECTED), onRejected)
      .addMatcher(createStatus(FULFILLED), onFulfilled);
  },
});
