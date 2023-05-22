import { configureStore } from '@reduxjs/toolkit';
import files from './files';

const store = configureStore({
  reducer: {
    files
  }
});

export default store;