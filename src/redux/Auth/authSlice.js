import { createSlice } from '@reduxjs/toolkit';

import {
  userLogIn,
  userLogOut,
  userRefresh,
  userRegister,
} from './operationsAuth';
import {
  onFulfilledLogOut,
  onFulfilledRefresh,
  onFulfilledRegisterLogin,
  onPending,
  onRejected,
} from './helpFunctionAuth';
const contactsInitialState = {
  user: { name: null, email: null },
  token: null,
  isLogged: false,
  isRefreshing: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(userRegister.fulfilled, onFulfilledRegisterLogin)
      .addCase(userLogIn.fulfilled, onFulfilledRegisterLogin)
      .addCase(userLogOut.fulfilled, onFulfilledLogOut)
      .addCase(userRefresh.fulfilled, onFulfilledRefresh)
      .addCase(userRefresh.pending, onPending)
      .addCase(userRefresh.rejected, onRejected);
  },
});
