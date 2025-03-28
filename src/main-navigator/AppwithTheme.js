import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { Appearance } from 'react-native';
import AppNavigator from './AppNavigator';
import { loadTheme, setTheme } from '../redux/slices/themeSlice';
import { darkTheme, lightTheme } from '../theme/appTheme';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';

export default function AppWithTheme() {
  const themes = useSelector((state) => state.theme); // Redux state for theme
  const dispatch = useDispatch(); // Dispatch function
  useEffect(() => {
    // Load theme on app start
    dispatch(loadTheme());
    // Add system appearance listener
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      console.log(colorScheme, 'colorScheme');
      dispatch(setTheme(colorScheme)); // Update theme in Redux store
    });
    // Cleanup listener on unmount
    return () => listener.remove();
  }, [dispatch]);
  const currentTheme = themes.theme === "dark" ? darkTheme : lightTheme;
  return (
    <>
      {/* Paper Provider for REACT-NATIVE-PAPER */}
      <PaperProvider theme={currentTheme}>
      <I18nextProvider i18n={i18n}>

        {/* Theme Provider to provide the theme */}
        <AppNavigator/>
        {/* Main App Navigator */}
      </I18nextProvider>

      </PaperProvider>
    </>
  );
}
