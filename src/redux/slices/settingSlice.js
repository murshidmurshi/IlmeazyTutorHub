import {createSlice} from '@reduxjs/toolkit';
import localization from '../../../assets/JSON/localization.json';

const initialState = {
  lang: 'English', // Default language
  translations: localization, // Store JSON in Redux
};

const SettingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload; // Update the language
    },
  },
});

export const {setLanguage} = SettingSlice.actions; // Export the action
export default SettingSlice.reducer;
