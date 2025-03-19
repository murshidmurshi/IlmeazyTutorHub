import {configureStore} from '@reduxjs/toolkit';
import themeSlice from '../slices/themeSlice';
import normalSlice from '../slices/normalSlice';
import settingSlice, { loadLanguage } from '../slices/settingSlice';

const store = configureStore({
  reducer: {
    //Define slice here
    theme: themeSlice,
    normal: normalSlice,
    setting: settingSlice,
  },
});

// Load stored language when app starts
loadLanguage(store.dispatch);

export default store;
