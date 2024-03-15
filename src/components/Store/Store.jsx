import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './ContactSlice/ContactSlice';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});

export default store;
