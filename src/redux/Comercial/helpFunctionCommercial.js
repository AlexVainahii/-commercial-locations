import { isAnyOf } from '@reduxjs/toolkit';
import {
  addCommerce,
  deleteCommerce,
  fetchCommerce,
  updateCommerce,
} from './operationsCommercial';
const arrThunks = [fetchCommerce, addCommerce, deleteCommerce, updateCommerce];
export const onPending = state => {
  state.isLoading = true;
};

export const onRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};
export const onFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = '';
};

export const onFulfilledFetch = (state, { payload }) => {
  state.commerces = payload;
};

export const onFulfilledAdd = (state, { payload }) => {
  console.log('payload :>> ', payload);
  state.commerces.push(payload);
};

export const onFulfilledDelete = (state, action) => {
  state.commerces = state.commerces.filter(
    commerce => commerce.id !== action.payload.id
  );
};

export const onFulfilledUpdate = (state, action) => {
  const index = state.commerces.findIndex(
    item => item.id === action.payload.id
  );

  if (index !== -1) {
    state.commerces[index] = action.payload;
  }
};

export const createStatus = type => isAnyOf(...arrThunks.map(el => el[type]));
