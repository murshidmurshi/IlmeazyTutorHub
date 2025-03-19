
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppWithTheme from './src/main-navigator/AppwithTheme';
import { I18nManager } from 'react-native';

// // Enable RTL support
// I18nManager.allowRTL(false);
// I18nManager.forceRTL(false);
// console.log('Is RTL:', I18nManager.isRTL); // Should print true if RTL is enabled




export default function App() {
  // useEffect(() => {
  //   // Hide the splash screen with fade effect after a delay
  //   setTimeout(() => {
  //     RNBootSplash.hide({fade: true, duration: 500});
  //   }, 200); // Set the time duration for which the splash screen is visible
  //   return () => {};
  // }, []);

  return (
    <>
      {/* this gesture handler for bottom sheet */}
      <GestureHandlerRootView className="flex-1">
        <Provider store={store}>
            <AppWithTheme />
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}
