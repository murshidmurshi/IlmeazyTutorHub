import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

const initialState = {
  language: 'en', // Default language
  isRTL: false, // Default direction
};

// Load stored language at app startup
export const loadLanguage = async (dispatch) => {
  try {
    const storedLanguage = await AsyncStorage.getItem('appLanguage');
    if (storedLanguage) {
      dispatch(setLanguage(storedLanguage));
    }
  } catch (error) {
    console.log('Error loading language:', error);
  }
};


export const changeLanguage = async (dispatch, lang) => {
  await AsyncStorage.setItem('appLanguage', lang);
  dispatch(setLanguage(lang));
  i18next.changeLanguage(lang);

  const isRTL = lang === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);
    // Add a small delay before restarting
    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  }
};


const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.isRTL = action.payload === 'ar';
    },
  },
});

export const { setLanguage ,} = settingSlice.actions;
export default settingSlice.reducer;
