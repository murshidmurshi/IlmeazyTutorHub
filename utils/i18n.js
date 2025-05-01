import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translations from '../assets/JSON/localization.json';
import store from '../src/redux/store/store';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart'; // Import restart package
import AsyncStorage from '@react-native-async-storage/async-storage';

i18n.use(initReactI18next).init({
  lng: store.getState().setting.language, // Get Redux language value
  fallbackLng: 'en',
  resources: {
    en: {translation: translations.en},
    ar: {translation: translations.ar},
    id: {translation: translations.id},
  },
});



let lastAppliedRTL = I18nManager.isRTL; // Store last applied RTL state

store.subscribe(async () => {
  const { language, isRTL } = store.getState().setting;
  // Update language
  i18n.changeLanguage(language);
  await AsyncStorage.setItem('appLanguage', language); // Persist language

  // Only restart if RTL setting has changed
  if (lastAppliedRTL !== isRTL) {
    lastAppliedRTL = isRTL; // Update last applied state

    // Ensure RTL settings are properly set
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);

    // Delay restart to allow changes to take effect
    setTimeout(() => {
      RNRestart.Restart(); // Restart app to apply changes
    }, 500);
  }
});

export default i18n;
