import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyDmSXxMOqapG2LrPzwHb30LOtaKxF60uvc',
  authDomain: 'commercial-eed2d.firebaseapp.com',
  projectId: 'commercial-eed2d',
  storageBucket: 'commercial-eed2d.appspot.com',
  messagingSenderId: '494366170846',
  appId: '1:494366170846:web:d87491655c8ac564186c4f',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchCommerce = createAsyncThunk(
  'commerce/fetchAll',
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'commerces'));
      const commerce = [];
      querySnapshot.forEach(doc => {
        const item = { id: doc.id, ...doc.data() };
        commerce.push(item);
      });
      return commerce;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const addCommerce = createAsyncThunk(
  'commerce/addCommerce',
  async (action, thunkAPI) => {
    const newItem = action;
    try {
      const docRef = await addDoc(collection(db, 'commerces'), newItem);
      newItem.id = docRef.id;
      return newItem;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteCommerce = createAsyncThunk(
  'commerce/deleteCommerce',
  async (commerceId, thunkAPI) => {
    try {
      const response = await deleteDoc(doc(db, 'commerces', commerceId));
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateCommerce = createAsyncThunk(
  'commerce/updateCommerce',
  async (action, thunkAPI) => {
    const updatedItem = action;
    try {
      const response = await updateDoc(
        doc(db, 'commerces', updatedItem.id),
        updatedItem
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
