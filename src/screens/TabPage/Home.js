import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function Home() {
  let {colors} = useTheme();
  const insets = useSafeAreaInsets(); // Get safe area insets

  return (
    <>
      {/* Status Bar */}
      <StatusBar
        backgroundColor={colors.primary} // Set status bar background to primary color
        barStyle="light-content" // Change text/icons to white for better visibility
        translucent={false} // Ensures it takes space and is not transparent
      />

      <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background_default,
          }}>
          {/* Home Header */}
          <View
            className="bg-red-400 p-3 pt-14 pb-4 rounded-2xl"
            style={{backgroundColor: colors.primary}}>
            {/* Greeting */}
            <Text
              className="font-semi text-lg "
              style={{
                color: colors.Base,
              }}>
              Welcome to Ilmeazy Tutor Hub
            </Text>

            {/* User Name */}
            <Text
              className="font-regular text-md "
              style={{
                color: colors.divider,
              }}>
              Mahammad Murshid
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
