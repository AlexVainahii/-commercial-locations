import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const setToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearToken = () => {
  axios.defaults.headers.common.Authorization = '';
};
export const userRegister = createAsyncThunk(
  'auth/register',
  async (registerData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', registerData);
      console.log(data);
      setToken(data.token);
      return data;
    } catch (e) {
      if (e.response.status === 400) {
        toast.error(
          `User with email ${registerData.email} is already registered!`
        );
      } else if (e.response.status === 500) {
        toast.error('Server error');
      }
      return rejectWithValue(e.message);
    }
  }
);
export const userLogIn = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', userData);
      setToken(data.token);
      return data;
    } catch (e) {
      if (e.response.status === 400) {
        toast.error(`User ${userData.email} is login error.`);
      }
      return rejectWithValue(e.message);
    }
  }
);
export const userLogOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      axios.post('/users/logout');
      clearToken();
      return;
    } catch (e) {
      if (e.response.status === 400) {
        toast.error(`Invalid Log Out`);
      } else if (e.response.status === '500') {
        toast.error('Server error');
      }
      return rejectWithValue(e.message);
    }
  }
);
export const userRefresh = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const getToken = state.auth.token;
    if (getToken === null) {
      return rejectWithValue('User is not logged in');
    }
    try {
      setToken(getToken);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (e) {
      if (e.response.status === 401) {
        toast.error(`Not authorized`);
      }
      return rejectWithValue(e.message);
    }
  }
);
