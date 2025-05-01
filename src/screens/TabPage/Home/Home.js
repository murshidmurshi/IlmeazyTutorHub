import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ProfileInComplete from './ProfileInComplete';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage} from '../../../redux/slices/settingSlice';
import {useTranslation} from 'react-i18next';
import ChangeLanguage from '../../../components/ChangeLanguage';

export default function Home() {
  let {colors} = useTheme();
  const {t} = useTranslation();
  // Extract Register translations
  const [welcomeMessage, name] = [t('Home.welcomeMessage'), t('Home.name')];

  // const insets = useSafeAreaInsets(); // Get safe area insets
  const HomeHeader = () => {
    return (
      <>
        {/* Home Header */}
        <View
          className="bg-red-400 p-3 pt-14 pb-4"
          style={{backgroundColor: colors.primary_main}}>
          {/* Greeting */}
          <Text
            className="font-regular text-lg "
            style={{
              color: colors.Base,
            }}>
            {welcomeMessage}
          </Text>

          {/* User Name */}
          <Text
            className=" font-p_medium text-md "
            style={{
              color: colors.Base2,
            }}>
            {name}
          </Text>
        </View>
      </>
    );
  };

 
  return (
    <>
      {/* Status Bar */}
      <StatusBar
        backgroundColor={colors.primary_main} // Set status bar background to primary color
        barStyle="light-content" // Change text/icons to white for better visibility
        translucent={false} // Ensures it takes space and is not transparent
      />

      <SafeAreaView style={{flex: 1, backgroundColor: colors.primary_main}}>
        <HomeHeader />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: colors.background_default,
          }}>
        {/* <ChangeLanguage /> */}
         
          {/* If profile is inComplete */}
          <ProfileInComplete />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
